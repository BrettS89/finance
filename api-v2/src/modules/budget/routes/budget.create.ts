import { PostgresCrud } from '../../../storage/db/postgres/crud';
import { TABLES } from '../../../storage/db/postgres/tables';
import { RegisterEndpoint } from '../../../types/api';
import { toBudgetDto } from '../budget.mappers';
import { budgetResponseSchema, createBudgetSchema } from '../budget.validators';
import { CreateBudgetDto } from '../types/budget.dto';
import { BudgetRow } from '../types/budget.row';

export const createBudgetEndpoint: RegisterEndpoint = ({ route, fastify }) => {
  fastify.route<{ Body: CreateBudgetDto }>({
    method: 'POST',
    url: route,
    schema: {
      tags: ['budget'],
      body: createBudgetSchema,
      response: {
        201: budgetResponseSchema,
      },
    },
    handler: async (request, reply) => {
      const pgCrud = new PostgresCrud(fastify.db.pool, TABLES.BUDGETS);
      const budget = await pgCrud.create<BudgetRow>(request.body);
      const response = toBudgetDto(budget);
      reply.status(201);
      return response;
    }
  });
};
