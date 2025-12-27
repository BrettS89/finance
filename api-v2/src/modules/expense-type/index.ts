import { FastifyInstance } from 'fastify';
import { createExpenseTypeEndpoint } from './routes/create-expense-type';

export const registerExpenseTypeRoutes = (fastify: FastifyInstance) => {
  createExpenseTypeEndpoint({ route: '/expense-type', fastify });
};
