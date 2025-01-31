import { http } from './config';
import { CreateExpenseType, PatchExpenseType } from '../redux/expense-type/slice';
import { CreateExpense } from '../redux/expense/slice';

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
  const { data } = await http({
    url: '/expense',
    method: 'GET',
  });

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
