import { createListenerMiddleware } from '@reduxjs/toolkit'
import { listeners as expenseListeners } from './expense/listener';
import { listeners as expenseTypeListeners } from './expense-type/listener';
import { listeners as groceryListeners } from './grocery/listener';
import { listeners as taskListeners } from './task/listener';
import { listeners as eventListeners } from './event/listener';
import { listeners as budgetListeners } from './budget/listener';

export const listenerMiddleware = createListenerMiddleware();

const listeners = [
  ...expenseListeners,
  ...expenseTypeListeners,
  ...groceryListeners,
  ...taskListeners,
  ...eventListeners,
  ...budgetListeners,
];

listeners.forEach(listener => listenerMiddleware.startListening(listener as any));
