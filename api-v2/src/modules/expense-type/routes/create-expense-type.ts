import { PostgresCrud } from '../../../storage/db/postgres/crud';
import { RegisterEndpoint } from '../../../types/api';
import { TABLES } from '../../../storage/db/postgres/tables';
import { toExpenseTypeDto } from '../expense-type.mappers';
import { createExpenseTypeSchema, expenseTypeResponseSchema } from '../expense-type.validators';
import { CreateExpenseTypeDto } from '../types/expense-type.dto';
import { ExpenseTypeRow } from '../types/expense-type.row';

export const createExpenseTypeEndpoint: RegisterEndpoint = ({ route, fastify }) => {
  fastify.route<{ Body: CreateExpenseTypeDto }>({
    method: 'POST',
    url: route,
    schema: {
      tags: ['expense-type'],
      body: createExpenseTypeSchema,
      response: {
        201: expenseTypeResponseSchema,
      },
    },
    handler: async (request, reply) => {
      const pgCrud = new PostgresCrud(fastify.db.pool, TABLES.EXPENSE_TYPES);
      const expenseType = await pgCrud.create<ExpenseTypeRow>(request.body);
      const response = toExpenseTypeDto(expenseType);
      reply.status(201).send(response);
    }
  });
};
