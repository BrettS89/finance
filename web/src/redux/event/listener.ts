import { ListenerEffectAPI } from '@reduxjs/toolkit';
import { addEvent, AddEventAction, deleteEvent as deleteEventAction, DeleteEventAction, eventsFetched, patchEvent, PatchEventAction, EmptyAction, fetchevents as fetchEventsAction } from './slice'
import { RootStore } from '../store';
import { createEvent as createEventAPI, deleteEvent as deleteEventAPI, fetchEvents as fetchEventsAPI, patchEvent as patchEventAPI } from '../../api/calls';

export const fetchEventsListener = {
  actionCreator: fetchEventsAction,
  effect: async (action: EmptyAction, listenerApi: ListenerEffectAPI<RootStore, any>) => {
    try {
      const eventList = await fetchEventsAPI();
      listenerApi.dispatch(eventsFetched(eventList));
    } catch(e) {
      if (e instanceof Error) {
        alert(e.message);
      } else {
        alert('Something went wrong.');
      }
    }
  },
}

export const addEventListener = {
  actionCreator: addEvent,
  effect: async (action: AddEventAction, listenerApi: ListenerEffectAPI<RootStore, any>) => {
    try {
      await createEventAPI(action.payload.data);
      const eventList = await fetchEventsAPI();
      listenerApi.dispatch(eventsFetched(eventList));
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

export const patchEventListener = {
  actionCreator: patchEvent,
  effect: async (action: PatchEventAction, listenerApi: ListenerEffectAPI<RootStore, any>) => {
    await patchEventAPI(action.payload.id, action.payload.data);
    const eventList = await fetchEventsAPI();
    listenerApi.dispatch(eventsFetched(eventList));
  },
};

export const deleteEventListener = {
  actionCreator: deleteEventAction,
  effect: async (action: DeleteEventAction, listenerApi: ListenerEffectAPI<RootStore, any>) => {
    await deleteEventAPI(action.payload.id);
    const eventList = await fetchEventsAPI();
    listenerApi.dispatch(eventsFetched(eventList));
  },
};

export const listeners = [
  fetchEventsListener,
  addEventListener,
  patchEventListener,
  deleteEventListener,
];
