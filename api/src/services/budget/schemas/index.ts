import { AnySchema } from 'ajv';

export type BudgetModel = {
  id: string;
  name: string;
  amount: number;
  created_at: string;
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

export const budgetResponseSchema: AnySchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
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
