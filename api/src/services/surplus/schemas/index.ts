import { AnySchema } from 'ajv';

export type SurplusModel = {
  id: string;
  amount: number;
  created_at: string;
}

export type SurplusCreate = {
  amount: number;
}

export type SurplusPatch = {
  amount: number;
}

export const surplusSchema: AnySchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    amount: { type: 'number' },
  },
  required: [
    'id',
    'amount',
  ],
  additionalProperties: false,
};

export const surplusResponseSchema: AnySchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    amount: { type: 'number' },
  },
  required: [
    'id',
    'amount',
  ],
  additionalProperties: false,
};

export const surplusCreateSchema: AnySchema = {
  type: 'object',
  properties: {
    amount: { type: 'number' },
  },
  required: [
    'amount',
  ],
  additionalProperties: false,
};

export const surplusPatchSchema: AnySchema = {
  type: 'object',
  properties: {
    amount: { type: 'number' },
  },
  required: [],
  additionalProperties: false,
};