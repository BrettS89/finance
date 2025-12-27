import { FastifyInstance } from 'fastify';
import { createSurplusEndpoint } from './routes/surplus.create';
import { getSurplusEndpoint } from './routes/surplus.get';

export const registerSurplusRoutes = (fastify: FastifyInstance) => {
  createSurplusEndpoint({ route: '/surplus', fastify });
  getSurplusEndpoint({ route: '/surplus', fastify });
};
