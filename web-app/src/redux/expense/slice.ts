import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CreateExpense = {
  name: string;
  amount: number;
  expense_type_id: string
}

export type PatchExpense = {
  id: string;
  data: {
    name?: string;
    amount?: number;
    expense_type_id?: string
  }
}

export type Expense = {
  id: string;
  name: string;
  amount: number;
  expense_type_id: string
}

export type ExpenseState = {
  list: Expense[];
}

const initialState: ExpenseState = {
  list: [],
};

// action types
export type AddExpenseAction = PayloadAction<{ data: CreateExpense, callback: () => void }>;
export type DeleteExpenseAction = PayloadAction<{ id: string }>;

const slice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    expensesFetched: (state, action: PayloadAction<Expense[]>) => {
      state.list = action.payload;
    },
    expenseAdded: (state, action: PayloadAction<Expense>) => {
      state.list.push(action.payload);
    },
    expenseDeleted: (state, action: PayloadAction<Expense>) => {
      state.list = state.list.filter(exp => exp.id !== action.payload.id);
    },
    addExpense: (_, action: AddExpenseAction) => {},
    deleteExpense: (_, action: DeleteExpenseAction) => {},
  },
});

export const { expensesFetched, addExpense, expenseAdded, deleteExpense, expenseDeleted } = slice.actions;
export const expenseReducer = slice.reducer;
