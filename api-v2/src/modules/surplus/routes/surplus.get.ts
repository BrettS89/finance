import { PostgresCrud } from '../../../storage/db/postgres/crud';
import { TABLES } from '../../../storage/db/postgres/tables';
import { RegisterEndpoint } from '../../../types/api';
import { NotFoundError } from '../../../utils/http-errors';
import { surplusResponseSchema } from '../surplus.validators';
import { SurplusRow } from '../types/surplus.row';

export const getSurplusEndpoint: RegisterEndpoint = ({ route, fastify }) => {
  fastify.route({
    method: 'GET',
    url: route,
    schema: {
      tags: ['surplus'],
      response: {
        200: surplusResponseSchema,
      },
    },
    handler: async (_, reply) => {
      const pgCrud = new PostgresCrud(fastify.db.pool, TABLES.SURPLUS);
      const rows = await pgCrud.find<SurplusRow>();

      const surplus = rows[0];

      if (!surplus) {
        throw new NotFoundError('No surplus was found');
      }

      reply.status(200);
      return surplus;
    }
  });
};
