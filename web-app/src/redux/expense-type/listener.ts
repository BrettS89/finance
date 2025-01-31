import { ListenerEffectAPI } from '@reduxjs/toolkit';
import { AddExpenseTypeAction, addExpenseType, expenseTypeAdded } from './slice'
import { RootStore } from '../store';
import { createExpenseType } from '../../api/calls';

export const addExpenseTypeListener = {
  actionCreator: addExpenseType,
  effect: async (action: AddExpenseTypeAction, listenerApi: ListenerEffectAPI<RootStore, any>) => {
    try {
      const createdExpenseType = await createExpenseType(action.payload.data);
      listenerApi.dispatch(expenseTypeAdded(createdExpenseType));
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

export const listeners = [
  addExpenseTypeListener,
];
