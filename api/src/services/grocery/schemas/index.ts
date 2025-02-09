import { AnySchema } from 'ajv';

export type GroceryModel = {
  id: string;
  name: string;
  createdAt: string;
}

export type GroceryCreate = {
  name: string;
}

export type GroceryPatch = {
  name: string;
}

export const surplusSchema: AnySchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    createdAt: { type: 'string' },
  },
  required: [
    'id',
    'name',
    'createdAt',
  ],
  additionalProperties: false,
};

export const surplusResponseSchema: AnySchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    createdAt: { type: 'string' },
  },
  required: [
    'id',
    'name',
    'createdAt',
  ],
  additionalProperties: false,
};

export const surplusCreateSchema: AnySchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
  },
  required: [
    'name',
  ],
  additionalProperties: false,
};

export const surplusPatchSchema: AnySchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
  },
  required: [],
  additionalProperties: false,
};