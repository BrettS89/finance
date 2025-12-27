import { ListenerEffectAPI } from '@reduxjs/toolkit';
import { addTask, AddTaskAction, deleteTask as deleteTaskAction, DeleteTaskAction, tasksFetched, patchTask, PatchTaskAction, EmptyAction, fetchtasks as fetchTasksAction } from './slice'
import { RootStore } from '../store';
import { createTask as createTaskAPI, deleteTask as deleteTaskAPI, fetchTasks as fetchTasksAPI, patchTask as patchTaskAPI } from '../../api/calls';

export const fetchTasksListener = {
  actionCreator: fetchTasksAction,
  effect: async (action: EmptyAction, listenerApi: ListenerEffectAPI<RootStore, any>) => {
    try {
      const taskList = await fetchTasksAPI();
      listenerApi.dispatch(tasksFetched(taskList));
    } catch(e) {
      if (e instanceof Error) {
        alert(e.message);
      } else {
        alert('Something went wrong.');
      }
    }
  },
}

export const addTaskListener = {
  actionCreator: addTask,
  effect: async (action: AddTaskAction, listenerApi: ListenerEffectAPI<RootStore, any>) => {
    try {
      await createTaskAPI(action.payload.data);
      const taskList = await fetchTasksAPI();
      listenerApi.dispatch(tasksFetched(taskList));
      action.payload.callback();

    } catch(e) {
      if (e instanceof Error) {
        alert(e.message);
      } else {
        alert('Something went wrong.');
      }
    }
  },
};

export const patchTaskListener = {
  actionCreator: patchTask,
  effect: async (action: PatchTaskAction, listenerApi: ListenerEffectAPI<RootStore, any>) => {
    await patchTaskAPI(action.payload.id, action.payload.data);
    const taskList = await fetchTasksAPI();
    listenerApi.dispatch(tasksFetched(taskList));
  },
};

export const deleteTaskListener = {
  actionCreator: deleteTaskAction,
  effect: async (action: DeleteTaskAction, listenerApi: ListenerEffectAPI<RootStore, any>) => {
    await deleteTaskAPI(action.payload.id);
    const taskList = await fetchTasksAPI();
    listenerApi.dispatch(tasksFetched(taskList));
  },
};

export const listeners = [
  fetchTasksListener,
  addTaskListener,
  patchTaskListener,
  deleteTaskListener,
];
