import { AnySchema } from 'ajv';

export const surplusResponseSchema: AnySchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    amount: { type: 'number' },
  },
  required: [
    'id',
    'amount',
  ],
  additionalProperties: false,
};

export const createSurplusSchema: AnySchema = {
  type: 'object',
  properties: {
    amount: { type: 'number', minimum: 0 },
  },
  required: [
    'amount',
  ],
  additionalProperties: false,
};
