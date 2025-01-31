import Ajv from 'ajv';
import { IService } from '../../types/IService';
import { db } from '../../storage/db';
import { SurplusCreate, surplusCreateSchema, SurplusModel, SurplusPatch, surplusPatchSchema } from './schemas';
import { BadRequestError, InternalServerError, NotFoundError } from '../../errors';

export class SurplusService implements IService  {
  private readonly tableName = 'surplus';

  async get(id: string) {
    return db.table(this.tableName).getById(id);
  }

  async find() {
    const result = await db.table(this.tableName).find();

    if (!result.length) {
      throw new NotFoundError('no surplus exists');
    }

    if (result.length > 1) {
      throw new InternalServerError('more than one surplus found');
    }

    return result[0];
  }

  async create(data: SurplusCreate) {
    const ajv = new Ajv();
    const valid = ajv.validate(surplusCreateSchema, data);

    if (!valid) {
      throw new BadRequestError('invalid request data');
    }

    const existingSurplus = await db.table(this.tableName).find();

    if (existingSurplus.length > 0) {
      throw new BadRequestError('Cannot have more than one surplus');
    }

    return db.table(this.tableName).create<SurplusModel>(data);
  }

  async patch(id: string, data: SurplusPatch) {
    const ajv = new Ajv();
    const valid = ajv.validate(surplusPatchSchema, data);

    if (!valid) {
      throw new BadRequestError('invalid request data');
    }

    return db.table(this.tableName).findByIdAndUpdate(id, data);
  }

  async delete(id: string) {
    return db.table(this.tableName).remove(id);
  }
}
