import { AnySchema } from 'ajv';

export type GroceryModel = {
  id: string;
  name: string;
  inCart: boolean;
  createdAt: string;
}

export type GroceryCreate = {
  name: string;
}

export type GroceryPatch = {
  name?: string;
  inCart?: boolean;
}

export const surplusSchema: AnySchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    inCart: { type: 'boolean' },
    createdAt: { type: 'string' },
  },
  required: [
    'id',
    'name',
    'inCart',
    'createdAt',
  ],
  additionalProperties: false,
};

export const surplusResponseSchema: AnySchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    inCart: { type: 'boolean' },
    createdAt: { type: 'string' },
  },
  required: [
    'id',
    'name',
    'inCart',
    'createdAt',
  ],
  additionalProperties: false,
};

export const surplusCreateSchema: AnySchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    inCart: { type: 'boolean' },
  },
  required: [
    'name',
    'inCart',
  ],
  additionalProperties: false,
};

export const surplusPatchSchema: AnySchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    inCart: { type: 'boolean' },
  },
  required: [],
  additionalProperties: false,
};
