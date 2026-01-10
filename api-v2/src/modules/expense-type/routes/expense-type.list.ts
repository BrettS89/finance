import { PostgresCrud } from '../../../storage/db/postgres/crud';
import { RegisterEndpoint } from '../../../types/api';
import { TABLES } from '../../../storage/db/postgres/tables';
import { toExpenseTypeDto } from '../expense-type.mappers';
import { expenseTypeResponseSchema } from '../expense-type.validators';
import { ExpenseTypeRow } from '../types/expense-type.row';

export const listExpenseTypeEndpoint: RegisterEndpoint = ({ route, fastify }) => {
  fastify.route({
    method: 'GET',
    url: route,
    schema: {
      tags: ['expense-type'],
      response: {
        200: { type: 'array', items: expenseTypeResponseSchema },
      },
    },
    handler: async (_, reply) => {
      const pgCrud = new PostgresCrud(fastify.db.pool, TABLES.EXPENSE_TYPES);
      const expenseTypes = await pgCrud.find<ExpenseTypeRow>();
      const response = expenseTypes.map(toExpenseTypeDto);
      reply.status(200);
      return response;
    }
  });
};
