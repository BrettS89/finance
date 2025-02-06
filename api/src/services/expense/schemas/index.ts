import { AnySchema } from 'ajv';

export type ExpenseModel = {
  id: string;
  name: string;
  amount: number;
  expenseTypeId: string;
  createdAt: string;
}

export type ExpenseCreate = {
  name: string;
  amount: number;
  expenseTypeId: string;
}

export type ExpensePatch = {
  name?: string;
  amount?: number;
}

export const expenseSchema: AnySchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    amount: { type: 'number' },
    expenseTypeId: { type: 'string' },
  },
  required: [
    'id',
    'name',
    'amount',
    'expenseTypeId',
  ],
  additionalProperties: false,
};

export const expenseResponseSchema: AnySchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    amount: { type: 'number' },
    expenseTypeId: { type: 'string' },
  },
  required: [
    'id',
    'name',
    'amount',
    'expenseTypeId',
  ],
  additionalProperties: false,
};

export const expenseCreateSchema: AnySchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    amount: { type: 'number' },
    expenseTypeId: { type: 'string' },
  },
  required: [
    'name',
    'amount',
    'expenseTypeId',
  ],
  additionalProperties: false,
};

export const expensePatchSchema: AnySchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    amount: { type: 'number' },
    expenseTypeId: { type: 'string' },
  },
  required: [],
  additionalProperties: false,
};
