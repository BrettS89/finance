import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CreateGrocery = {
  name: string;
}

export type PatchGrocery = {
  name?: string;
  inCart?: boolean;
}

export type Grocery = {
  id: string;
  name: string;
  inCart: boolean;
  createdAt: string;
}

export type GroceryState = {
  list: Grocery[];
}

const initialState: GroceryState = {
  list: [],
};

// action types
export type AddGroceryAction = PayloadAction<{ data: CreateGrocery, callback: () => void }>;
export type DeleteGroceryAction = PayloadAction<{ id: string }>;
export type PatchGroceryAction = PayloadAction<{ id: string; data: PatchGrocery; }>
export type EmptyAction = PayloadAction<void>;

const slice = createSlice({
  name: 'grocery',
  initialState,
  reducers: {
    groceriesFetched: (state, action: PayloadAction<Grocery[]>) => {
      state.list = action.payload;
    },
    groceryAdded: (state, action: PayloadAction<Grocery>) => {
      state.list.push(action.payload);
    },
    groceryDeleted: (state, action: PayloadAction<Grocery>) => {
      state.list = state.list.filter(exp => exp.id !== action.payload.id);
    },
    fetchGroceries: (_, action: PayloadAction<void>) => {},
    addGrocery: (_, action: AddGroceryAction) => {},
    deleteGrocery: (_, action: DeleteGroceryAction) => {},
    patchGrocery: (_, action: PatchGroceryAction) => {},
    batchDeleteGroceries: (_, action: EmptyAction) => {},
  },
});

export const { groceriesFetched, addGrocery, groceryAdded, deleteGrocery, groceryDeleted, patchGrocery, batchDeleteGroceries, fetchGroceries } = slice.actions;
export const groceryReducer = slice.reducer;
