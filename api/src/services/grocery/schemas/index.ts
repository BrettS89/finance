import { AnySchema } from 'ajv';

export type GroceryModel = {
  id: string;
  name: string;
  inCart: boolean;
  created_at: string;
}

export type GroceryCreate = {
  name: string;
}

export type GroceryPatch = {
  name?: string;
  inCart?: boolean;
}

export const grocerySchema: AnySchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    inCart: { type: 'boolean' },
    created_at: { type: 'string' },
  },
  required: [
    'id',
    'name',
    'inCart',
    'created_at',
  ],
  additionalProperties: false,
};

export const groceryResponseSchema: AnySchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    inCart: { type: 'boolean' },
    created_at: { type: 'string' },
  },
  required: [
    'id',
    'name',
    'inCart',
    'created_at',
  ],
  additionalProperties: false,
};

export const groceryCreateSchema: AnySchema = {
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

export const groceryPatchSchema: AnySchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    inCart: { type: 'boolean' },
  },
  required: [],
  additionalProperties: false,
};
