import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Surplus = {
  id: string;
  amount: number;
}

export type SurplusState = Surplus;

let initialState: SurplusState = {
  id: 'n/a',
  amount: 0,
};

const slice = createSlice({
  name: 'surplus',
  initialState,
  reducers: {
    surplusFetched: (state, action: PayloadAction<Surplus>) => {
      state.amount = action.payload.amount;
      state.id = action.payload.id;
    },
  },
});

export const { surplusFetched } = slice.actions;
export const surplusReducer = slice.reducer;
