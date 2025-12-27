import { PostgresCrud } from '../../../storage/db/postgres/crud';
import { TABLES } from '../../../storage/db/postgres/tables';
import { RegisterEndpoint } from '../../../types/api';
import { BudgetRow } from '../types/budget.row';

export const deleteBudgetEndpoint: RegisterEndpoint = ({ route, fastify }) => {
  fastify.route<{ Params: { id: number } }>({
    method: 'DELETE',
    url: route,
    schema: {
      tags: ['budget'],
      response: {
        204: { type: 'null' },
      },
    },
    handler: async (request, reply) => {
      const pgCrud = new PostgresCrud(fastify.db.pool, TABLES.BUDGETS);
      await pgCrud.remove<BudgetRow>(request.params.id);
      reply.status(204).send();
    }
  });
};
