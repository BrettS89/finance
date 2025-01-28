import Ajv from 'ajv';
import { IService } from '../../types/IService';
import { db } from '../../storage/db';
import { ExpenseCreate, expenseCreateSchema, expensePatchSchema, ExpenseModel, ExpensePatch } from './schemas';
import { BadRequestError } from '../../errors';

export class ExpenseService implements IService  {
  private readonly tableName = 'expense';

  async get(id: string) {
    return db.table(this.tableName).getById(id);
  }

  async find() {
    return db.table(this.tableName).find();
  }

  async create(data: ExpenseCreate) {
    const ajv = new Ajv();
    const valid = ajv.validate(expenseCreateSchema, data);

    if (!valid) {
      throw new BadRequestError('invalid request data');
    }

    return db.table(this.tableName).create<ExpenseModel>(data);
  }

  async patch(id: string, data: ExpensePatch) {
    const ajv = new Ajv();
    const valid = ajv.validate(expensePatchSchema, data);

    if (!valid) {
      throw new BadRequestError('invalid request data');
    }

    return db.table(this.tableName).findByIdAndUpdate(id, data);
  }

  async delete(id: string) {
    return db.table(this.tableName).remove(id);
  }
}
