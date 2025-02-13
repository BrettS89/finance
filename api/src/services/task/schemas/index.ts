import { AnySchema } from 'ajv';

export type TaskModel = {
  id: string;
  name: string;
  completed: boolean;
  createdAt: string;
}

export type TaskCreate = {
  name: string;
}

export type TaskPatch = {
  name?: string;
  completed?: boolean;
}

export const taskSchema: AnySchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    completed: { type: 'boolean' },
    createdAt: { type: 'string' },
  },
  required: [
    'id',
    'name',
    'completed',
    'createdAt',
  ],
  additionalProperties: false,
};

export const taskResponseSchema: AnySchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    completed: { type: 'boolean' },
    createdAt: { type: 'string' },
  },
  required: [
    'id',
    'name',
    'completed',
    'createdAt',
  ],
  additionalProperties: false,
};

export const taskCreateSchema: AnySchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    completed: { type: 'boolean' },
  },
  required: [
    'name',
    'completed',
  ],
  additionalProperties: false,
};

export const taskPatchSchema: AnySchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    completed: { type: 'boolean' },
  },
  required: [],
  additionalProperties: false,
};
