import { AnySchema } from 'ajv';

export type BudgetModel = {
  id: string;
  name: string;
  amount: number;
  createdAt: string;
}

export type BudgetCreate = {
  name: string;
  amount: number;
}

export type BudgetPatch = {
  name?: string;
  amount?: number;
}

export const budgetSchema: AnySchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    amount: { type: 'number' },
    createdAt: { type: 'string' },
  },
  required: [
    'id',
    'name',
    'amount',
    'createdAt',
  ],
  additionalProperties: false,
};

export const budgetResponseSchema: AnySchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    amount: { type: 'number' },
    createdAt: { type: 'string' },
  },
  required: [
    'id',
    'name',
    'amount',
    'createdAt',
  ],
  additionalProperties: false,
};

export const budgetCreateSchema: AnySchema = {
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

export const budgetPatchSchema: AnySchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    amount: { type: 'number' },
  },
  required: [],
  additionalProperties: false,
};
