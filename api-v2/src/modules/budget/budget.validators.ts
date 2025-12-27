import { AnySchema } from 'ajv';

export const budgetResponseSchema: AnySchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    amount: { type: 'number' },
    created_at: { type: 'string' },
  },
  required: [
    'id',
    'name',
    'amount',
    'created_at',
  ],
  additionalProperties: false,
};

export const createBudgetSchema: AnySchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    amount: { type: 'number' },
  },
  required: [
    'name',
    'amount',
  ],
  additionalProperties: false,
};
