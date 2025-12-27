import { AnySchema } from 'ajv';

export const expenseResponseSchema: AnySchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    amount: { type: 'number' },
    expense_type_id: { type: 'integer' },
    created_at: { type: 'string' },
  },
  required: [
    'id',
    'name',
    'amount',
    'expense_type_id',
    'created_at',
  ],
  additionalProperties: false,
};

export const createExpenseSchema: AnySchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    amount: { type: 'number', minimum: 1 },
    expense_type_id: { type: 'integer', minimum: 1 },
  },
  required: [
    'name',
    'amount',
    'expense_type_id',

  ],
  additionalProperties: false,
};
