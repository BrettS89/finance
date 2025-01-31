import { createListenerMiddleware } from '@reduxjs/toolkit'
import { listeners as expenseListeners } from './expense/listener';
import { listeners as expenseTypeListeners } from './expense-type/listener';

export const listenerMiddleware = createListenerMiddleware();

const listeners = [
  ...expenseListeners,
  ...expenseTypeListeners
];

listeners.forEach(listener => listenerMiddleware.startListening(listener as any));
