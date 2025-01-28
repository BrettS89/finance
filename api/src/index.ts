import { app } from './app';
import { db } from './storage/db';

const start = async () => {
  await db.connect();
  await db.addTables(['expense-type', 'expense', 'surplus']);

  app.listen(4006, () => {
    console.log('Server listening on port 4006');
  });
}

start();
