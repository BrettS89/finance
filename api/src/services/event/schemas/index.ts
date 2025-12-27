import { AnySchema } from 'ajv';

export type EventModel = {
  id: string;
  name: string;
  datetime: string;
  created_at: string;
}

export type EventCreate = {
  name: string;
  datetime: string;
}

export type EventPatch = {
  name?: string;
  datetime?: string;
}

export const eventSchema: AnySchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    datetime: { type: 'string' },
    created_at: { type: 'string' },
  },
  required: [
    'id',
    'name',
    'datetime',
    'created_at',
  ],
  additionalProperties: false,
};

export const eventResponseSchema: AnySchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    datetime: { type: 'string' },
    created_at: { type: 'string' },
  },
  required: [
    'id',
    'name',
    'datetime',
    'created_at',
  ],
  additionalProperties: false,
};

export const eventCreateSchema: AnySchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    datetime: { type: 'string' },
  },
  required: [
    'name',
    'datetime',
  ],
  additionalProperties: false,
};

export const eventPatchSchema: AnySchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    datetime: { type: 'string' },
  },
  required: [],
  additionalProperties: false,
};
