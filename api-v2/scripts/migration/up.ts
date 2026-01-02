import { config } from 'dotenv';
config()
import { runner } from 'node-pg-migrate';

async function runMigrations() {
  await runner({
    databaseUrl: `${process.env.DATABASE_URL}/${process.env.PG_DATABASE}` as string,
    dir: 'migrations',
    direction: 'up',
    migrationsTable: 'migrations',
  });
}

runMigrations();
