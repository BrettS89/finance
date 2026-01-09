import { http } from './config';
import { CreateExpenseType, PatchExpenseType } from '../redux/expense-type/slice';
import { CreateExpense } from '../redux/expense/slice';
import { CreateGrocery, PatchGrocery } from '../redux/grocery/slice';
import { CreateTask, PatchTask } from '../redux/task/slice';
import { CreateBudget } from '../redux/budget/slice';

export const fetchExpenseTypes = async () => {
  const { data } = await http({
    url: '/expense-type',
    method: 'GET',
  });

  return data;
};

export const createExpenseType = async (data: CreateExpenseType) => {
  const { data: d } = await http({
    url: '/expense-type',
    method: 'POST',
    data,
  });

  return d;
};

export const patchExpenseType = async (id: string, data: PatchExpenseType) => {
  const { data: d } = await http({
    url: `/expense-type/${id}`,
    method: 'PATCH',
    data,
  });

  return d;
};

export const deleteExpenseType = async (id: string) => {
  const { data: d } = await http({
    url: `/expense-type/${id}`,
    method: 'DELETE',
  });

  return d;
};


// expenses

export const fetchExpenses = async () => {
  const { data, status } = await http({
    url: '/expense',
    method: 'GET',
  });

  console.log(status);
  console.log(data);

  return data;
};

export const createExpense = async (payload: CreateExpense) => {
  const { data } = await http({
    url: '/expense',
    method: 'POST',
    data: payload,
  });

  return data;
};

export const deleteExpense = async (id: string) => {
  const { data } = await http({
    url: `/expense/${id}`,
    method: 'DELETE',
  });

  return data;
};

// surplus

export const fetchSurplus = async () => {
  const { data } = await http({
    url: '/surplus',
    method: 'GET',
  });

  return data;
};

// groceries 

export const fetchGroceries = async () => {
  const { data } = await http({
    url: '/grocery',
    method: 'GET',
  });

  return data;
};

export const createGrocery = async (payload: CreateGrocery) => {
  const { data } = await http({
    url: '/grocery',
    method: 'POST',
    data: {
      ...payload,
      inCart: false,
    },
  });

  return data;
};

export const deleteGrocery = async (id: string) => {
  const { data } = await http({
    url: `/grocery/${id}`,
    method: 'DELETE',
  });

  return data;
};

export const patchGrocery = async (id: string, payload: PatchGrocery) => {
  const { data } = await http({
    url: `/grocery/${id}`,
    method: 'PATCH',
    data: payload,
  });
};

export const batchDeleteGroceries = async () => {
  await http({
    url: `/grocery/batch-delete`,
    method: 'POST',
  });
};

// tasks

export const fetchTasks = async () => {
  const { data } = await http({
    url: '/task',
    method: 'GET',
  });

  return data;
};

export const createTask = async (payload: CreateTask) => {
  const { data } = await http({
    url: '/task',
    method: 'POST',
    data: {
      ...payload,
      completed: false,
    },
  });

  return data;
};

export const deleteTask = async (id: string) => {
  const { data } = await http({
    url: `/task/${id}`,
    method: 'DELETE',
  });

  return data;
};

export const patchTask = async (id: string, payload: PatchTask) => {
  const { data } = await http({
    url: `/task/${id}`,
    method: 'PATCH',
    data: payload,
  });

  return data
};

// Events

export const fetchEvents = async () => {
  const { data } = await http({
    url: '/event',
    method: 'GET',
  });

  return data;
};

export const createEvent = async (payload: CreateTask) => {
  const { data } = await http({
    url: '/event',
    method: 'POST',
    data: {
      ...payload,
    },
  });

  return data;
};

export const deleteEvent = async (id: string) => {
  const { data } = await http({
    url: `/event/${id}`,
    method: 'DELETE',
  });

  return data;
};

export const patchEvent = async (id: string, payload: PatchTask) => {
  const { data } = await http({
    url: `/event/${id}`,
    method: 'PATCH',
    data: payload,
  });

  return data
};

// BUDGET

export const fetchBudget = async () => {
  const { data } = await http({
    url: '/budget',
    method: 'GET',
  });

  return data;
};

export const createBudget = async (payload: CreateBudget) => {
  const { data } = await http({
    url: '/budget',
    method: 'POST',
    data: payload,
  });

  return data;
};

export const deleteBudget = async (id: string) => {
  const { data } = await http({
    url: `/budget/${id}`,
    method: 'DELETE',
  });

  return data;
};