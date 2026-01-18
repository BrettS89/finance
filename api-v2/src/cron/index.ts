import { Pool } from 'pg';
import { CronJob } from 'cron';
import { TABLES } from '../storage/db/postgres/tables';
import { ExpenseTypeRow } from '../modules/expense-type/types/expense-type.row';
import { ExpenseRow } from '../modules/expense/types/expense.row';

const deleteExpenses = async (db: Pool, frequency: 'week' | 'month' | 'year') => {
  const { rows: expenseTypes } = await db.query<ExpenseTypeRow>(`
    SELECT * FROM ${TABLES.EXPENSE_TYPES};
    WHERE frequency = $1
  `, [frequency]);

  if (!expenseTypes.length) return;

  const budget = expenseTypes.reduce((acc, curr) => {
    return acc + Number(curr.budget);
  }, 0);

  const ids = expenseTypes.reduce((acc: Record<number, boolean>, curr) => {
    acc[curr.id as unknown as number] = true;
    return acc;
  }, {});

  const { rows: expenses } = await db.query<ExpenseRow>(`
    SELECT * FROM ${TABLES.EXPENSES}
  `);

  let spent = 0;

  for (let expense of expenses) {
    if (ids[expense.expense_type_id as unknown as number]) {
      spent += Number(expense.amount);
      await db.query(`DELETE FROM ${TABLES.EXPENSES} WHERE id = $1`, [expense.id]);
    }
  }

  const remaining = budget - spent;

  if (remaining <= 0) return;

  await db.query(`
    UPDATE ${TABLES.SURPLUS}
    SET amount = amount + $1
  `,[remaining]);
};

export const startCrons = (db: Pool) => {
  new CronJob(
    '0 0 * * 0',
    async function() {
      await deleteExpenses(db, 'week');
    },
    null,
    false,
    'America/New_York',
  ).start();

  new CronJob(
    '0 0 1 * *',
    async function() {
      await deleteExpenses(db, 'month');
    },
    null,
    false,
    'America/New_York',
  ).start();

  new CronJob(
    '0 0 1 1 *',
    async function() {
      await deleteExpenses(db, 'year');
    },
    null,
    false,
    'America/New_York',
  ).start();
}
