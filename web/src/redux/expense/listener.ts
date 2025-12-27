import { ListenerEffectAPI } from '@reduxjs/toolkit';
import { addExpense, AddExpenseAction, deleteExpense as deleteExpenseAction, DeleteExpenseAction, expensesFetched } from './slice'
import { surplusFetched } from '../surplus/slice';
import { RootStore } from '../store';
import { createExpense, deleteExpense, fetchExpenses, fetchSurplus } from '../../api/calls';

export const addExpenseListener = {
  actionCreator: addExpense,
  effect: async (action: AddExpenseAction, listenerApi: ListenerEffectAPI<RootStore, any>) => {
    try {
      await createExpense(action.payload.data);
      const allExpenses = await fetchExpenses();
      listenerApi.dispatch(expensesFetched(allExpenses));
      action.payload.callback();

      const surplus = await fetchSurplus();
      listenerApi.dispatch(surplusFetched(surplus));

    } catch(e) {
      if (e instanceof Error) {
        alert(e.message);
      } else {
        alert('Something went wrong.');
      }
    }
  },
};

export const deleteExpenseListener = {
  actionCreator: deleteExpenseAction,
  effect: async (action: DeleteExpenseAction, listenerApi: ListenerEffectAPI<RootStore, any>) => {
    await deleteExpense(action.payload.id);
    const allExpenses = await fetchExpenses();
    listenerApi.dispatch(expensesFetched(allExpenses));

    const surplus = await fetchSurplus();
    listenerApi.dispatch(surplusFetched(surplus));
  },
};

export const listeners = [
  addExpenseListener,
  deleteExpenseListener,
];
