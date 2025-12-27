import { FastifyInstance } from 'fastify';
import { createExpenseTypeEndpoint } from './routes/create-expense-type';
import { listExpenseTypeEndpoint } from './routes/expense-type.list';

export const registerExpenseTypeRoutes = (fastify: FastifyInstance) => {
  createExpenseTypeEndpoint({ route: '/expense-type', fastify });
  listExpenseTypeEndpoint({ route: '/expense-type', fastify });
};
