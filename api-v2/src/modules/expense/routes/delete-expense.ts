import { PostgresCrud } from '../../../storage/db/postgres/crud';
import { TABLES } from '../../../storage/db/postgres/tables';
import { RegisterEndpoint } from '../../../types/api';
import { ExpenseRow } from '../types/expense.row';

export const deleteExpenseEndpoint: RegisterEndpoint = ({ route, fastify }) => {
  fastify.route<{ Params: { id: string } }>({
    method: 'DELETE',
    url: route,
    schema: {
      tags: ['expense'],
      response: {
        204: { type: 'null' },
      },
    },
    handler: async (request, reply) => {
      const pgCrud = new PostgresCrud(fastify.db.pool, TABLES.EXPENSES);
      await pgCrud.remove<ExpenseRow>(request.params.id);
      reply.status(204).send();
    }
  });
};
