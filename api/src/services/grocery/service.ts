import Ajv from 'ajv';
import { IService } from '../../types/IService';
import { db } from '../../storage/db';
import { GroceryCreate, surplusCreateSchema, GroceryModel, GroceryPatch, surplusPatchSchema } from './schemas';
import { BadRequestError, InternalServerError, NotFoundError } from '../../errors';

export class GroceryService implements IService<GroceryCreate, GroceryPatch, GroceryModel>  {
  private readonly tableName = 'grocery';

  async get(id: string): Promise<GroceryModel | null> {
    return db.table(this.tableName).getById<GroceryModel>(id);
  }

  async find(): Promise<GroceryModel[]> {
    const result = await db.table(this.tableName).find<GroceryModel>();
    console.log(result);

    return result;
  }

  async create(data: GroceryCreate) {
    const ajv = new Ajv();
    const valid = ajv.validate(surplusCreateSchema, data);

    if (!valid) {
      throw new BadRequestError('invalid request data');
    }

    const existingSurplus = await db.table(this.tableName).find();

    if (existingSurplus.length > 0) {
      throw new BadRequestError('Cannot have more than one surplus');
    }

    return db.table(this.tableName).create<GroceryModel>(data);
  }

  async patch(id: string, data: GroceryPatch) {
    const ajv = new Ajv();
    const valid = ajv.validate(surplusPatchSchema, data);

    if (!valid) {
      throw new BadRequestError('invalid request data');
    }

    return db.table(this.tableName).findByIdAndUpdate<GroceryPatch, GroceryModel>(id, data);
  }

  async delete(id: string) {
    return db.table(this.tableName).remove<GroceryModel>(id);
  }
}
