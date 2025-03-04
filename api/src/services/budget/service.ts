import Ajv from 'ajv';
import { IService } from '../../types/IService';
import { db } from '../../storage/db';
import { BudgetCreate, budgetCreateSchema, BudgetModel, BudgetPatch, budgetPatchSchema } from './schemas';
import { BadRequestError } from '../../errors';

export class BudgetService implements IService<BudgetCreate, BudgetPatch, BudgetModel>  {
  private readonly tableName = 'budget';

  async get(id: string): Promise<BudgetModel | null> {
    return db.table(this.tableName).getById<BudgetModel>(id);
  }

  async find(): Promise<BudgetModel[]> {
    const result = await db.table(this.tableName).find<BudgetModel>();

    return result.sort((a, b) => b.amount - a.amount);
  }

  async create(data: BudgetCreate) {
    const ajv = new Ajv();
    const valid = ajv.validate(budgetCreateSchema, data);

    if (!valid) {
      throw new BadRequestError('invalid request data');
    }

    return db.table(this.tableName).create<BudgetModel>(data);
  }

  async patch(id: string, data: BudgetPatch) {
    const ajv = new Ajv();
    const valid = ajv.validate(budgetPatchSchema, data);

    if (!valid) {
      throw new BadRequestError('invalid request data');
    }

    return db.table(this.tableName).findByIdAndUpdate<BudgetPatch, BudgetModel>(id, data);
  }

  async delete(id: string) {
    return db.table(this.tableName).remove<BudgetModel>(id);
  }

  async batchDelete(): Promise<void> {
    return db.table(this.tableName).batchDelete();
  }
}
