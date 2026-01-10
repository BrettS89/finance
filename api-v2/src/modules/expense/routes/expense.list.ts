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
      const result = await fastify.db.pool.query<ExpenseRow>(`
        SELECT *
        FROM ${TABLES.EXPENSES}
        ORDER BY id ASC
      `);

      const response = result.rows.map(toExpenseDto);

      return response;
    }
  });
};
