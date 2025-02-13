import Ajv from 'ajv';
import { IService } from '../../types/IService';
import { db } from '../../storage/db';
import { GroceryCreate, groceryCreateSchema, GroceryModel, GroceryPatch, groceryPatchSchema } from './schemas';
import { BadRequestError } from '../../errors';

export class GroceryService implements IService<GroceryCreate, GroceryPatch, GroceryModel>  {
  private readonly tableName = 'grocery';

  async get(id: string): Promise<GroceryModel | null> {
    return db.table(this.tableName).getById<GroceryModel>(id);
  }

  async find(): Promise<GroceryModel[]> {
    const result = await db.table(this.tableName).find<GroceryModel>();

    return result;
  }

  async create(data: GroceryCreate) {
    const ajv = new Ajv();
    const valid = ajv.validate(groceryCreateSchema, data);

    if (!valid) {
      throw new BadRequestError('invalid request data');
    }

    return db.table(this.tableName).create<GroceryModel>(data);
  }

  async patch(id: string, data: GroceryPatch) {
    const ajv = new Ajv();
    const valid = ajv.validate(groceryPatchSchema, data);

    if (!valid) {
      throw new BadRequestError('invalid request data');
    }

    return db.table(this.tableName).findByIdAndUpdate<GroceryPatch, GroceryModel>(id, data);
  }

  async delete(id: string) {
    return db.table(this.tableName).remove<GroceryModel>(id);
  }

  async batchDelete(): Promise<void> {
    return db.table(this.tableName).batchDelete();
  }
}
