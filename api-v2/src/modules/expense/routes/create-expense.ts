import { PostgresCrud } from '../../../storage/db/postgres/crud';
import { TABLES } from '../../../storage/db/postgres/tables';
import { RegisterEndpoint } from '../../../types/api';
import { toExpenseDto } from '../expense.mappers';
import { createExpenseSchema, expenseResponseSchema } from '../expense.validators';
import { CreateExpenseDto } from '../types/expense.dto';
import { ExpenseRow } from '../types/expense.row';

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
      const pgCrud = new PostgresCrud(fastify.db.pool, TABLES.EXPENSES);
      const expense = await pgCrud.create<ExpenseRow>(request.body);
      console.log('wtf', expense);
      const response = toExpenseDto(expense);
      reply.status(201).send(response);
    }
  });
};
