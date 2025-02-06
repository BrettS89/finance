import { AnySchema } from 'ajv';

export type ExpenseTypeModel = {
  id: string;
  name: string;
  frequency: 'week' | 'month' | 'year';
  budget: number;
  description?: string;
  createdAt: string
}

export type ExpenseTypeCreate = {
  name: string;
  frequency: 'week' | 'month' | 'year';
  budget: number;
  description?: string;
}

export type ExpenseTypePatch = {
  name?: string;
  frequency?: 'week' | 'month' | 'year';
  budget?: number;
  description?: string;
}

export const expenseTypeSchema: AnySchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    frequency: { type: 'string', enum: ['week', 'month', 'year'] },
    description: { type: 'string' },
    budget: { type: 'number' },
  },
  required: [
    'id',
    'name',
    'frequency',
    'budget',
  ],
  additionalProperties: false,
};

export const expenseTypeSchemaResponse: AnySchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    frequency: { type: 'string', enum: ['week', 'month', 'year'] },
    description: { type: 'string' },
    budget: { type: 'number' },
  },
  required: [
    'id',
    'name',
    'frequency',
    'budget',
  ],
  additionalProperties: false,
};

export const expenseTypeCreateSchema: AnySchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    frequency: { type: 'string', enum: ['week', 'month', 'year'] },
    description: { type: 'string' },
    budget: { type: 'number' },
  },
  required: [
    'name',
    'frequency',
    'budget',
  ],
  additionalProperties: false,
};

export const expenseTypePatchSchema: AnySchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    frequency: { type: 'string', enum: ['week', 'month', 'year'] },
    description: { type: 'string' },
    budget: { type: 'number' },
  },
  required: [],
  additionalProperties: false,
};
