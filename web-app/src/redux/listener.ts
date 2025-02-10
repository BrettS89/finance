import { createListenerMiddleware } from '@reduxjs/toolkit'
import { listeners as expenseListeners } from './expense/listener';
import { listeners as expenseTypeListeners } from './expense-type/listener';
import { listeners as groceryListeners } from './grocery/listener';

export const listenerMiddleware = createListenerMiddleware();

const listeners = [
  ...expenseListeners,
  ...expenseTypeListeners,
  ...groceryListeners,
];

listeners.forEach(listener => listenerMiddleware.startListening(listener as any));
