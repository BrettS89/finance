import { PostgresCrud } from '../../../storage/db/postgres/crud';
import { TABLES } from '../../../storage/db/postgres/tables';
import { RegisterEndpoint } from '../../../types/api';
import { createSurplusSchema, surplusResponseSchema } from '../surplus.validators';
import { CreateSurplusDto } from '../types/surplus.dto';
import { SurplusRow } from '../types/surplus.row';

export const createSurplusEndpoint: RegisterEndpoint = ({ route, fastify }) => {
  fastify.route<{ Body: CreateSurplusDto }>({
    method: 'POST',
    url: route,
    schema: {
      tags: ['surplus'],
      body: createSurplusSchema,
      response: {
        201: surplusResponseSchema,
      },
    },
    handler: async (request, reply) => {
      const pgCrud = new PostgresCrud(fastify.db.pool, TABLES.SURPLUS);
      const surplus = await pgCrud.create<SurplusRow>(request.body);
      reply.status(201);
      return surplus;
    }
  });
};
