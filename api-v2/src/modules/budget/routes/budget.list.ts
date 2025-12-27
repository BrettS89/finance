import { PostgresCrud } from '../../../storage/db/postgres/crud';
import { TABLES } from '../../../storage/db/postgres/tables';
import { RegisterEndpoint } from '../../../types/api';
import { toBudgetDto } from '../budget.mappers';
import { budgetResponseSchema } from '../budget.validators';
import { BudgetRow } from '../types/budget.row';

export const listBudgetEndpoint: RegisterEndpoint = ({ route, fastify }) => {
  fastify.route({
    method: 'GET',
    url: route,
    schema: {
      tags: ['budget'],
      response: {
        200: { type: 'array', items: budgetResponseSchema },
      },
    },
    handler: async (_, reply) => {
      const pgCrud = new PostgresCrud(fastify.db.pool, TABLES.BUDGETS);
      const budgets = await pgCrud.find<BudgetRow>();
      const response = budgets.map(toBudgetDto)
      reply.status(200).send(response);
    }
  });
};
