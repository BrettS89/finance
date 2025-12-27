import { PostgresCrud } from '../../../storage/db/postgres/crud';
import { RegisterEndpoint } from '../../../types/api';
import { TABLES } from '../../../storage/db/postgres/tables';
import { expenseResponseSchema } from '../expense.validators';
import { ExpenseRow } from '../types/expense.row';
import { toExpenseDto } from '../expense.mappers';

export const listExpensesEndpoint: RegisterEndpoint = ({ route, fastify }) => {
  fastify.route({
    method: 'GET',
    url: route,
    schema: {
      tags: ['expense'],
      response: {
        200: { type: 'array', items: expenseResponseSchema },
      },
    },
    handler: async (_, reply) => {
      const pgCrud = new PostgresCrud(fastify.db.pool, TABLES.EXPENSES);
      const expenses = await pgCrud.find<ExpenseRow>();
      const response = expenses.map(toExpenseDto);
      reply.status(200).send(response);
    }
  });
};
