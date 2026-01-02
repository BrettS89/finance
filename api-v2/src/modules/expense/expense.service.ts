import { Pool, DatabaseError } from 'pg';
import { TABLES } from '../../storage/db/postgres/tables';
import { PostgresCrud } from '../../storage/db/postgres/crud';
import { CreateExpenseDto } from './types/expense.dto';
import { ExpenseRow } from './types/expense.row';
import { SurplusRow } from '../surplus/types/surplus.row';
import { NotFoundError, ServiceUnavailableError } from '../../utils/http-errors';
import { BEGIN_TRANSACTION, GET_EXISTING_EXPENSES_WITH_BUDGET, UPDATE_SURPLUS, GET_EXPENSE_TYPE_FOR_DELETE, UPDATE_SURPLUS_ON_DELETE } from './expense.sql';

export class ExpenseService {
  constructor(private db: Pool) {}

  async createExpense(expense: CreateExpenseDto) {
    const client = await this.db.connect();
    
    try {
      await client.query(BEGIN_TRANSACTION);
      await client.query('SELECT pg_advisory_xact_lock($1::bigint)', [expense.expense_type_id]);

      const pgCrud = new PostgresCrud(client, TABLES.EXPENSES);

      const createdExpense = await pgCrud.create<ExpenseRow>(expense);

      const existingExpenses = await client.query<{ budget: string; total: string }>(
        GET_EXISTING_EXPENSES_WITH_BUDGET,
        [expense.expense_type_id]
      );

      const row = existingExpenses.rows[0];
      if (!row) throw new NotFoundError('No expense type found with this id');

      const budget = Number(row.budget);
      const total = Number(row.total);

      const difference = budget - total;

      if (difference < 0) {
        await client.query<SurplusRow>(
          UPDATE_SURPLUS,
          [difference, Number(createdExpense.amount)]
        );
      }

      await client.query('COMMIT');

      return createdExpense;

    } catch(e) {
      try {
        await client.query('ROLLBACK');
      } catch {}

      if (e instanceof DatabaseError) {
        if (e.code === '55P03' || e.code === '57014' || e.message.includes('lock timeout')) {
          throw new ServiceUnavailableError('System is busy please try again in a moment.');
        }
      }
      
      throw e;
    } finally {
      client.release();
    }
  }

  async deleteExpense(expenseId: string) {
    const client = await this.db.connect();
    
    try {
      await client.query(BEGIN_TRANSACTION);

      const expRes = await client.query<Pick<ExpenseRow, 'id'|'expense_type_id'|'amount'>>(
        GET_EXPENSE_TYPE_FOR_DELETE,
        [expenseId]
      );

      const exp = expRes.rows[0];
      if (!exp) throw new NotFoundError('No expense found with this id');

      const expenseTypeId = exp.expense_type_id;

      await client.query('SELECT pg_advisory_xact_lock($1::bigint)', [expenseTypeId]);

      const pgCrud = new PostgresCrud(client, TABLES.EXPENSES);

      const deletedExpense = await pgCrud.remove<ExpenseRow>(expenseId);

      if (!deletedExpense) {
        throw new NotFoundError('No expense found with this id');
      }

      const deletedAmount = Number(deletedExpense.amount)

      const existingExpenses = await client.query<{ budget: string; total: string }>(
        GET_EXISTING_EXPENSES_WITH_BUDGET,
        [expenseTypeId]
      );

      const row = existingExpenses.rows[0];
      if (!row) throw new NotFoundError('No expense type found with this id');

      const budget = Number(row.budget);
      const total = Number(row.total) + deletedAmount;

      const difference = budget - total;

      if (difference < 0) {
        await client.query(
          UPDATE_SURPLUS_ON_DELETE,
          [difference, deletedAmount]
        );
      }

      await client.query('COMMIT');

      return deletedExpense;

    } catch(e) {
      try {
        await client.query('ROLLBACK');
      } catch {}

      if (e instanceof DatabaseError) {
        if (e.code === '55P03' || e.code === '57014' || e.message.includes('lock timeout')) {
          throw new ServiceUnavailableError('System is busy please try again in a moment.');
        }
      }
      
      throw e;
    } finally {
      client.release();
    }
  }
}