import { RegisterEndpoint } from '../../../types/api';
import { toExpenseDto } from '../expense.mappers';
import { createExpenseSchema, expenseResponseSchema } from '../expense.validators';
import { ExpenseService } from '../expense.service';

export const deleteExpenseEndpoint: RegisterEndpoint = ({ route, fastify }) => {
  fastify.route<{ Params: { id: string } }>({
    method: 'DELETE',
    url: route,
    schema: {
      tags: ['expense'],
      response: {
        200: expenseResponseSchema,
      },
    },
    handler: async (request, reply) => {
      const expenseService = new ExpenseService(fastify.db.pool);
      const deletedExpense = await expenseService.deleteExpense(request.params.id);
      const response = toExpenseDto(deletedExpense);
      reply.status(200).send(response);
    }
  });
};
