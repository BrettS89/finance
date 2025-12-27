import { FastifyInstance } from 'fastify';
import { createExpenseEndpoint } from './routes/create-expense';
import { listExpensesEndpoint } from './routes/expense.list';
import { deleteExpenseEndpoint } from './routes/delete-expense';

export const registerExpenseRoutes = (fastify: FastifyInstance) => {
  createExpenseEndpoint({ route: '/expense', fastify });
  deleteExpenseEndpoint({ route: '/expense/:id', fastify });
  listExpensesEndpoint({ route: '/expense', fastify });
};
