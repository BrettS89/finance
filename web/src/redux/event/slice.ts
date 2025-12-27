import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CreateEvent = {
  name: string;
  datetime: string;
}

export type PatchEvent = {
  name?: string;
  datetime?: string;
}

export type Event = {
  id: string;
  name: string;
  datetime: string;
  created_at: string;
}

export type EventState = {
  list: Event[];
}

const initialState: EventState = {
  list: [],
};

// action types
export type AddEventAction = PayloadAction<{ data: CreateEvent, callback: () => void }>;
export type DeleteEventAction = PayloadAction<{ id: string }>;
export type PatchEventAction = PayloadAction<{ id: string; data: PatchEvent; }>
export type EmptyAction = PayloadAction<void>;

const slice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    eventsFetched: (state, action: PayloadAction<Event[]>) => {
      state.list = action.payload;
    },
    eventAdded: (state, action: PayloadAction<Event>) => {
      state.list.push(action.payload);
    },
    eventDeleted: (state, action: PayloadAction<Event>) => {
      state.list = state.list.filter(exp => exp.id !== action.payload.id);
    },
    fetchevents: (_, action: PayloadAction<void>) => {},
    addEvent: (_, action: AddEventAction) => {},
    deleteEvent: (_, action: DeleteEventAction) => {},
    patchEvent: (_, action: PatchEventAction) => {},
  },
});

export const { eventsFetched, addEvent, eventAdded, deleteEvent, eventDeleted, patchEvent, fetchevents } = slice.actions;
export const eventReducer = slice.reducer;
