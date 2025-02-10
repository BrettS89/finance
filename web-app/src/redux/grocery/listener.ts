import { ListenerEffectAPI } from '@reduxjs/toolkit';
import { addGrocery, AddGroceryAction, deleteGrocery as deleteGroceryAction, DeleteGroceryAction, groceriesFetched, patchGrocery, PatchGroceryAction, batchDeleteGroceries, BatchDeleteGroceriesAction } from './slice'
import { RootStore } from '../store';
import { createGrocery, deleteGrocery, fetchGroceries, patchGrocery as patchGroceryAPI, batchDeleteGroceries as batchDeleteGroceriesAPI } from '../../api/calls';

export const addGroceryListener = {
  actionCreator: addGrocery,
  effect: async (action: AddGroceryAction, listenerApi: ListenerEffectAPI<RootStore, any>) => {
    try {
      await createGrocery(action.payload.data);
      const groceryList = await fetchGroceries();
      listenerApi.dispatch(groceriesFetched(groceryList));
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

export const patchGroceryListener = {
  actionCreator: patchGrocery,
  effect: async (action: PatchGroceryAction, listenerApi: ListenerEffectAPI<RootStore, any>) => {
    await patchGroceryAPI(action.payload.id, action.payload.data);
    const groceryList = await fetchGroceries();
    listenerApi.dispatch(groceriesFetched(groceryList));
  },
};

export const deleteGroceryListener = {
  actionCreator: deleteGroceryAction,
  effect: async (action: DeleteGroceryAction, listenerApi: ListenerEffectAPI<RootStore, any>) => {
    await deleteGrocery(action.payload.id);
    const groceryList = await fetchGroceries();
    listenerApi.dispatch(groceriesFetched(groceryList));
  },
};

export const batchDeleteGroceriesListener = {
  actionCreator: batchDeleteGroceries,
  effect: async (_: BatchDeleteGroceriesAction, listenerApi: ListenerEffectAPI<RootStore, any>) => {
    await batchDeleteGroceriesAPI();
    listenerApi.dispatch(groceriesFetched([]));
  },
};

export const listeners = [
  addGroceryListener,
  patchGroceryListener,
  deleteGroceryListener,
  batchDeleteGroceriesListener,
];
