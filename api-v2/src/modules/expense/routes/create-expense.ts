import { RegisterEndpoint } from '../../../types/api';
import { toExpenseDto } from '../expense.mappers';
import { createExpenseSchema, expenseResponseSchema } from '../expense.validators';
import { CreateExpenseDto } from '../types/expense.dto';
import { ExpenseService } from '../expense.service';

export const createExpenseEndpoint: RegisterEndpoint = ({ route, fastify }) => {
  fastify.route<{ Body: CreateExpenseDto }>({
    method: 'POST',
    url: route,
    schema: {
      tags: ['expense'],
      body: createExpenseSchema,
      response: {
        201: expenseResponseSchema,
      },
    },
    handler: async (request, reply) => {
      const expenseService = new ExpenseService(fastify.db.pool);
      const createdExpense = await expenseService.createExpense(request.body);
      const response = toExpenseDto(createdExpense);
      reply.status(201).send(response);
    }
  });
};
