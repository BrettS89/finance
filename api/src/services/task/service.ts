import Ajv from 'ajv';
import { IService } from '../../types/IService';
import { db } from '../../storage/db';
import { TaskCreate, taskCreateSchema, TaskModel, TaskPatch, taskPatchSchema } from './schemas';
import { BadRequestError } from '../../errors';

export class TaskService implements IService<TaskCreate, TaskPatch, TaskModel>  {
  private readonly tableName = 'task';

  async get(id: string): Promise<TaskModel | null> {
    return db.table(this.tableName).getById<TaskModel>(id);
  }

  async find(): Promise<TaskModel[]> {
    const result = await db.table(this.tableName).find<TaskModel>();

    return result;
  }

  async create(data: TaskCreate) {
    const ajv = new Ajv();
    const valid = ajv.validate(taskCreateSchema, data);

    if (!valid) {
      throw new BadRequestError('invalid request data');
    }

    return db.table(this.tableName).create<TaskModel>(data);
  }

  async patch(id: string, data: TaskPatch) {
    const ajv = new Ajv();
    const valid = ajv.validate(taskPatchSchema, data);

    if (!valid) {
      throw new BadRequestError('invalid request data');
    }

    return db.table(this.tableName).findByIdAndUpdate<TaskPatch, TaskModel>(id, data);
  }

  async delete(id: string) {
    return db.table(this.tableName).remove<TaskModel>(id);
  }

}
