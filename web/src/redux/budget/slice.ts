import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CreateBudget = {
  name: string;
  amount: number;
}

export type PatchBudget = {
  id: string;
  data: {
    name?: string;
    amount?: number;
  }
}

export type Budget = {
  id: string;
  name: string;
  amount: number;
}

export type BudgetState = {
  list: Budget[];
}

const initialState: BudgetState = {
  list: [],
};

// action types
export type AddBudgetAction = PayloadAction<{ data: CreateBudget, callback: () => void }>;
export type DeleteBudgetAction = PayloadAction<{ id: string }>;

const slice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    budgetsFetched: (state, action: PayloadAction<Budget[]>) => {
      state.list = action.payload;
    },
    budgetAdded: (state, action: PayloadAction<Budget>) => {
      state.list.push(action.payload);
    },
    budgetDeleted: (state, action: PayloadAction<Budget>) => {
      state.list = state.list.filter(exp => exp.id !== action.payload.id);
    },
    addBudget: (_, action: AddBudgetAction) => {},
    deleteBudget: (_, action: DeleteBudgetAction) => {},
  },
});

export const { budgetsFetched, addBudget, budgetAdded, deleteBudget, budgetDeleted } = slice.actions;
export const budgetReducer = slice.reducer;
