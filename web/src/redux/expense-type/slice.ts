import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CreateExpenseType = {
  name: string;
  budget: number;
  frequency: 'week' | 'month' | 'year';
  description?: string;
}

export type PatchExpenseType = {
  id: string;
  data: {
    name?: string;
    budget?: number;
    frequency?: 'week' | 'month' | 'year';
    description?: string;
  },
}

export type ExpenseType = {
  id: string;
  name: string;
  budget: number;
  frequency: 'week' | 'month' | 'year';
  description?: string;
}

export type ExpenseTypeState = {
  list: ExpenseType[];
}

const initialState: ExpenseTypeState = {
  list: [],
};

// action types
export type AddExpenseTypeAction = PayloadAction<{ data: CreateExpenseType; callback(): void }>;
export type UpdateExpenseTypeAction = PayloadAction<PatchExpenseType>;

const slice = createSlice({
  name: 'expense-type',
  initialState,
  reducers: {
    expenseTypesFetched: (state, action: PayloadAction<ExpenseType[]>) => {
      state.list = action.payload;
    },
    expenseTypeAdded: (state, action: PayloadAction<ExpenseType>) => {
      state.list.push(action.payload);
    },
    expenseTypeUpdated: (state, action: PayloadAction<ExpenseType>) => {
      
    },
    addExpenseType: (_, action: AddExpenseTypeAction) => {},
    updateExpenseType: (_, action: UpdateExpenseTypeAction) => {},
  },
});

export const { expenseTypesFetched, addExpenseType, expenseTypeAdded } = slice.actions;
export const expenseTypeReducer = slice.reducer;
