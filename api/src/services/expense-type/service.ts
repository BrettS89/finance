import Ajv from 'ajv';
import { IService } from '../../types/IService';
import { db } from '../../storage/db';
import { ExpenseTypeCreate, expenseTypeCreateSchema, expenseTypePatchSchema, ExpenseTypeModel, ExpenseTypePatch } from './schemas';
import { BadRequestError } from '../../errors';

export class ExpenseTypeService implements IService  {
  async get(id: string) {
    return db.table('expense-type').getById(id);
  }

  async find() {
    return db.table('expense-type').find();
  }

  async create(data: ExpenseTypeCreate) {
    const ajv = new Ajv();
    const valid = ajv.validate(expenseTypeCreateSchema, data);

    if (!valid) {
      throw new BadRequestError('invalid request data');
    }

    return db.table('expense-type').create<ExpenseTypeModel>(data);
  }

  async patch(id: string, data: ExpenseTypePatch) {
    const ajv = new Ajv();
    const valid = ajv.validate(expenseTypePatchSchema, data);

    if (!valid) {
      throw new BadRequestError('invalid request data');
    }

    return db.table('expense-type').findByIdAndUpdate(id, data);
  }

  async delete(id: string) {
    return db.table('expense-type').remove(id);
  }
}
