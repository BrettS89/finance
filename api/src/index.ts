import { app } from './app';
import { db } from './storage/db';
import { clearWeeklyExpenses, clearMonthlyExpenses, clearAnnualExpenses } from './cron';

const start = async () => {
  await db.connect();
  await db.addTables(['expense-type', 'expense', 'surplus', 'grocery', 'task', 'event', 'budget']);

  clearWeeklyExpenses.start();
  clearMonthlyExpenses.start();
  clearAnnualExpenses.start();

  app.listen(4006, () => {
    console.log('Server listening on port 4006');
  });
}

start();
