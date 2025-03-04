import Ajv from 'ajv';
import { IService } from '../../types/IService';
import { db } from '../../storage/db';
import { EventCreate, eventCreateSchema, EventModel, EventPatch, eventPatchSchema } from './schemas';
import { BadRequestError } from '../../errors';

export class EventService implements IService<EventCreate, EventPatch, EventModel>  {
  private readonly tableName = 'event';

  async get(id: string): Promise<EventModel | null> {
    return db.table(this.tableName).getById<EventModel>(id);
  }

  async find(): Promise<EventModel[]> {
    const result = await db.table(this.tableName).find<EventModel>();

    return result
      .sort((a, b) => {
        return (a.datetime < b.datetime) ? -1 : ((a.datetime > b.datetime) ? 1 : 0);
      })
      .filter(el => {
        const todayAtMidnight = new Date();

        todayAtMidnight.setHours(0);
        todayAtMidnight.setMinutes(0);
        todayAtMidnight.setSeconds(0);
        todayAtMidnight.setMilliseconds(0);

        return el.datetime > todayAtMidnight.toISOString();
      });
  }

  async create(data: EventCreate) {
    const ajv = new Ajv();
    const valid = ajv.validate(eventCreateSchema, data);

    if (!valid) {
      throw new BadRequestError('invalid request data');
    }

    return db.table(this.tableName).create<EventModel>(data);
  }

  async patch(id: string, data: EventPatch) {
    const ajv = new Ajv();
    const valid = ajv.validate(eventPatchSchema, data);

    if (!valid) {
      throw new BadRequestError('invalid request data');
    }

    return db.table(this.tableName).findByIdAndUpdate<EventPatch, EventModel>(id, data);
  }

  async delete(id: string) {
    return db.table(this.tableName).remove<EventModel>(id);
  }

}
