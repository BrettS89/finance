import { db } from './src/storage/db';

const clearExpenses = async () => {
  const expenses = await db.table('expense').find();
  
  for (let expense of expenses) {
    await db.table('expense').remove(expense.id);
  }

  const surplus = await db.table('surplus').find();

  if (!surplus.length) {
    throw new Error('no surplus');
  }

  await db.table('surplus').findByIdAndUpdate(surplus[0].id, { amount: 0 });
}

clearExpenses();
