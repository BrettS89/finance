import Ajv from 'ajv';
import { IService } from '../../types/IService';
import { db } from '../../storage/db';
import { SurplusCreate, surplusCreateSchema, SurplusModel, SurplusPatch, surplusPatchSchema } from './schemas';
import { BadRequestError } from '../../errors';

export class SurplusService implements IService  {
  private readonly tableName = 'expense';

  async get(id: string) {
    return db.table(this.tableName).getById(id);
  }

  async find() {
    return db.table(this.tableName).find();
  }

  async create(data: SurplusCreate) {
    const ajv = new Ajv();
    const valid = ajv.validate(surplusCreateSchema, data);

    if (!valid) {
      throw new BadRequestError('invalid request data');
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
