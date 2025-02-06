import { CronJob } from 'cron';
import { ExpenseTypeService } from '../services/expense-type/service';
import { ExpenseService } from '../services/expense/service';
import { SurplusService } from '../services/surplus/service';

const deleteExpenses = async (frequency: 'week' | 'month' | 'year') => {
  const expenseTypeService = new ExpenseTypeService();
  const expenseService = new ExpenseService();
  const surplusService = new SurplusService();

  const expenseTypes = (await expenseTypeService.find())
    .filter(expType => expType.frequency === frequency);

  if (!expenseTypes.length) return;

  const budget = expenseTypes.reduce((acc, curr) => {
    return acc + curr.budget;
  }, 0);

  const ids = expenseTypes.reduce((acc: Record<string, boolean>, curr) => {
    acc[curr.id] = true;
    return acc;
  }, {});

  const expenses = await expenseService.find();

  let spent = 0;

  for (let expense of expenses) {
    if (ids[expense.expenseTypeId]) {
      spent += expense.amount;
      await expenseService.delete(expense.id);
    }
  }

  const remaining = budget - spent;

  if (remaining <= 0) return;

  const surplusResults = await surplusService.find();

  const surplus = surplusResults[0];
  
  await surplusService.patch(surplus.id, { amount: surplus.amount + remaining });
};

export const clearWeeklyExpenses = new CronJob(
  '0 0 * * 0',
  async function() {
    await deleteExpenses('week');
  },
  null,
  false,
  'America/New_York',
);

export const clearMonthlyExpenses = new CronJob(
  '0 0 1 * *',
  async function() {
    await deleteExpenses('month');
  },
  null,
  false,
  'America/New_York',
);

export const clearAnnualExpenses = new CronJob(
  '0 0 1 1 *',
  async function() {
    await deleteExpenses('year');
  },
  null,
  false,
  'America/New_York',
);
