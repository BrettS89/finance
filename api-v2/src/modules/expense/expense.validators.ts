import { AnySchema } from 'ajv';

export const expenseResponseSchema: AnySchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    amount: { type: 'number' },
    expenseTypeId: { type: 'integer' },
  },
  required: [
    'id',
    'name',
    'amount',
    'expenseTypeId',
  ],
  additionalProperties: false,
};

export const createExpenseSchema: AnySchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    amount: { type: 'number', minimum: 1 },
    expenseTypeId: { type: 'integer', minimum: 1 },
  },
  required: [
    'name',
    'amount',
    'expenseTypeId',
  ],
  additionalProperties: false,
};
