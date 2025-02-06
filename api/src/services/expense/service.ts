import Ajv from 'ajv';
import { IService } from '../../types/IService';
import { db } from '../../storage/db';
import { ExpenseCreate, expenseCreateSchema, expensePatchSchema, ExpenseModel, ExpensePatch } from './schemas';
import { BadRequestError } from '../../errors';
import { ExpenseTypeService } from '../expense-type/service';
import { SurplusService } from '../surplus/service';

export class ExpenseService implements IService<ExpenseCreate, ExpensePatch, ExpenseModel>  {
  private readonly tableName = 'expense';

  async get(id: string) {
    return db.table(this.tableName).getById<ExpenseModel | null>(id);
  }

  async find() {
    return db.table(this.tableName).find<ExpenseModel>();
  }

  async create(data: ExpenseCreate) {
    const ajv = new Ajv();
    const valid = ajv.validate(expenseCreateSchema, data);

    if (!valid) {
      throw new BadRequestError('invalid request data');
    }

    const created = await db.table(this.tableName).create<ExpenseModel>(data);

    const expenseType = await new ExpenseTypeService().get(created.expenseTypeId);

    if (!expenseType) {
      throw new BadRequestError('No expense type found with this id');
    }

    const expenses = (await db.table(this.tableName).find<ExpenseModel>())
      .filter(expense => expense.expenseTypeId === expenseType.id);

    const total = expenses.reduce((acc, curr) => {
      return acc + curr.amount;
    }, 0);

    const difference = expenseType.budget - total;

    if (difference < 0) {
      const surplusService = new SurplusService();

      const surplusResults = await surplusService.find();

      const surplus = surplusResults[0];

      if (!surplus) {
        throw new Error('No surplus was found');
      }

      if (Math.abs(difference) >= created.amount) {
        await surplusService.patch(surplus.id, { amount: surplus.amount - created.amount });
      } else {
        await surplusService.patch(surplus.id, { amount: surplus.amount + difference });
      }
    }

    return created;
  }

  async patch(id: string, data: ExpensePatch) {
    const ajv = new Ajv();
    const valid = ajv.validate(expensePatchSchema, data);

    if (!valid) {
      throw new BadRequestError('invalid request data');
    }

    return db.table(this.tableName).findByIdAndUpdate<ExpensePatch, ExpenseModel>(id, data);
  }

  async delete(id: string) {
    const removed = await db.table(this.tableName).remove<ExpenseModel>(id);

    const expenseType = await new ExpenseTypeService().get(removed.expenseTypeId) as any;

    const expenses = (await db.table(this.tableName).find<ExpenseModel>())
      .filter(expense => expense.expenseTypeId === expenseType.id);

    const total = expenses.reduce((acc, curr) => {
      return acc + curr.amount;
    }, 0) + removed.amount;

    const difference = expenseType.budget - total;

    if (difference >= 0) {
      return removed;
    }

    const surplusService = new SurplusService();

    const surplusResults = await surplusService.find();

    const surplus = surplusResults[0];

    if (!surplus) {
      throw new Error('No surplus was found');
    }

    if (Math.abs(difference) > removed.amount) {
      await surplusService.patch(surplus.id, { amount: surplus.amount + removed.amount });
    } else {
      await surplusService.patch(surplus.id, { amount: surplus.amount + Math.abs(difference) });
    }

    return removed;
  }
}
