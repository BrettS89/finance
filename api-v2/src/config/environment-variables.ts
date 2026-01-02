import Ajv, { JSONSchemaType } from 'ajv';

type EnvVars = {
  ENVIRONMENT: 'local' | 'dev' | 'prod';
  PORT?: number;
  PGHOST: string;
  PGPORT: number;
  PGUSER: string;
  PGPASSWORD: string;
  PG_DATABASE: string;
  DATABASE_URL?: string;
};

const schema: JSONSchemaType<EnvVars> = {
  type: 'object',
  additionalProperties: false,
  properties: {
    ENVIRONMENT: { type: 'string', enum: ['local', 'dev', 'prod'] },
    PORT: { type: 'number', nullable: true, minimum: 1, maximum: 65535, multipleOf: 1 },
    PGHOST: { type: 'string', minLength: 1 },
    PGPORT: { type: 'number', minimum: 1, maximum: 65535, multipleOf: 1 },
    PGUSER: { type: 'string', minLength: 1 },
    PGPASSWORD: { type: 'string', minLength: 1 },
    PG_DATABASE: { type: 'string', minLength: 1 },
    DATABASE_URL: { type: 'string', nullable: true, minLength: 1 },
  },
  required: ['ENVIRONMENT', 'PGHOST', 'PGPORT', 'PGUSER', 'PGPASSWORD', 'PG_DATABASE'],
};
export function validateEnvironmentVariables(): Readonly<EnvVars> {
  const ajv = new Ajv({ allErrors: true, coerceTypes: true });

  const validate = ajv.compile(schema);

  const data: Record<string, unknown> = {
    ENVIRONMENT: process.env.ENVIRONMENT,
    PORT: process.env.PORT,
    PGHOST: process.env.PGHOST,
    PGPORT: process.env.PGPORT,
    PGUSER: process.env.PGUSER,
    PGPASSWORD: process.env.PGPASSWORD,
    PG_DATABASE: process.env.PG_DATABASE,
    DATABASE_URL: process.env.DATABASE_URL,
  };

  const ok = validate(data);

  if (!ok) {
    const details = (validate.errors ?? [])
      .map(e => `${e.instancePath || '(root)'} ${e.message ?? ''}`.trim())
      .join(', ');
    throw new Error(`Invalid environment variables: ${details}`);
  }

  return Object.freeze(data as EnvVars);
}

export const envVars = validateEnvironmentVariables();
