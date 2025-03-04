import { ListenerEffectAPI } from '@reduxjs/toolkit';
import { addBudget, AddBudgetAction, deleteBudget as deleteBudgetAction, DeleteBudgetAction, budgetsFetched } from './slice'
import { surplusFetched } from '../surplus/slice';
import { RootStore } from '../store';
import { createBudget, deleteBudget, fetchBudget, fetchSurplus } from '../../api/calls';

export const addBudgetListener = {
  actionCreator: addBudget,
  effect: async (action: AddBudgetAction, listenerApi: ListenerEffectAPI<RootStore, any>) => {
    try {
      await createBudget(action.payload.data);
      const allBudgets = await fetchBudget();
      listenerApi.dispatch(budgetsFetched(allBudgets));
      action.payload.callback();

    } catch(e) {
      if (e instanceof Error) {
        alert(e.message);
      } else {
        alert('Something went wrong.');
      }
    }
  },
};

export const deleteBudgetListener = {
  actionCreator: deleteBudgetAction,
  effect: async (action: DeleteBudgetAction, listenerApi: ListenerEffectAPI<RootStore, any>) => {
    await deleteBudget(action.payload.id);
    const allBudgets = await fetchBudget();
    listenerApi.dispatch(budgetsFetched(allBudgets));
  },
};

export const listeners = [
  addBudgetListener,
  deleteBudgetListener,
];
