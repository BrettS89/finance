import { AnySchema } from 'ajv';

export const createExpenseTypeSchema: AnySchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    frequency: { type: 'string', enum: ['week', 'month', 'year'] },
    description: { type: 'string' },
    budget: { type: 'integer', minimum: 1 },
  },
  required: [
    'name',
    'frequency',
    'budget',
  ],
};

export const expenseTypeResponseSchema: AnySchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    frequency: { type: 'string', enum: ['week', 'month', 'year'] },
    description: { type: 'string' },
    budget: { type: 'number' },
    created_at: { type: 'string' },
  },
  required: [
    'id',
    'name',
    'frequency',
    'budget',
    'created_at',
  ],
  additionalProperties: false,
};
