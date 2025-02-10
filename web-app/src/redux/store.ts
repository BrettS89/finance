import { configureStore } from '@reduxjs/toolkit';
import { listenerMiddleware } from './listener';

import { expenseTypeReducer } from './expense-type/slice';
import { expenseReducer } from './expense/slice';
import { surplusReducer } from './surplus/slice';
import { groceryReducer } from './grocery/slice';

export const store = configureStore({
  reducer: {
    expenseType: expenseTypeReducer,
    expense: expenseReducer,
    surplus: surplusReducer,
    grocery: groceryReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false }).prepend(listenerMiddleware.middleware);
  },
});

export type RootStore = ReturnType<typeof store.getState>;

// selectors
export const expensesSelector = (store: RootStore) => store.expense.list;
export const expenseTypesSelector = (store: RootStore) => store.expenseType.list;
export const surplusSelector = (store: RootStore) => store.surplus;
export const grocerySelector = (store: RootStore) => store.grocery;
 