import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CreateTask = {
  name: string;
}

export type PatchTask = {
  name?: string;
  completed?: boolean;
}

export type Task = {
  id: string;
  name: string;
  completed: boolean;
  createdAt: string;
}

export type TaskState = {
  list: Task[];
}

const initialState: TaskState = {
  list: [],
};

// action types
export type AddTaskAction = PayloadAction<{ data: CreateTask, callback: () => void }>;
export type DeleteTaskAction = PayloadAction<{ id: string }>;
export type PatchTaskAction = PayloadAction<{ id: string; data: PatchTask; }>
export type EmptyAction = PayloadAction<void>;

const slice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    tasksFetched: (state, action: PayloadAction<Task[]>) => {
      state.list = action.payload;
    },
    taskAdded: (state, action: PayloadAction<Task>) => {
      state.list.push(action.payload);
    },
    taskDeleted: (state, action: PayloadAction<Task>) => {
      state.list = state.list.filter(exp => exp.id !== action.payload.id);
    },
    fetchtasks: (_, action: PayloadAction<void>) => {},
    addTask: (_, action: AddTaskAction) => {},
    deleteTask: (_, action: DeleteTaskAction) => {},
    patchTask: (_, action: PatchTaskAction) => {},
  },
});

export const { tasksFetched, addTask, taskAdded, deleteTask, taskDeleted, patchTask, fetchtasks } = slice.actions;
export const taskReducer = slice.reducer;
