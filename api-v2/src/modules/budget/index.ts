import { FastifyInstance } from 'fastify';
import { createBudgetEndpoint } from './routes/budget.create';
import { listBudgetEndpoint } from './routes/budget.list';
import { deleteBudgetEndpoint } from './routes/budget.delete';

export const registerBudgetRoutes = (fastify: FastifyInstance) => {
  createBudgetEndpoint({ route: '/budget', fastify });
  listBudgetEndpoint({ route: '/budget', fastify });
  deleteBudgetEndpoint({ route: '/budget/:id', fastify });
};
