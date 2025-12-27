import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { eventSelector } from '../../redux/store';
import { addEvent as addEventAction, deleteEvent as deleteEventAction, fetchevents as fetchEventsAction } from '../../redux/event/slice';
import { EventItem } from './event-item';
import { styles } from './styles';
import { EventsHeader } from './header';
import { AddEventModal } from './add-event.modal';

export const Events = () => {
  const [addEventModalIsOpen, setAddEventModalIsOpen] = useState<boolean>(false);

  const dispatch = useDispatch();
  const event = useSelector(eventSelector);

  const addEvent = (name: string, datetime: string) => {
    dispatch(addEventAction({
      callback: closeAddEventModal,
      data: {
        name,
        datetime,
      },
    }));
  };

  const deleteEvent = (id: string) => {
    dispatch(deleteEventAction({ id }));
  };

  const closeAddEventModal = () => {
    setAddEventModalIsOpen(false);
  };

  const fetchEvents = () => {
    dispatch(fetchEventsAction());
  };

  const renderEvents = () => {
    return event.list.map((item, i) => {
      return (
        <EventItem
          key={item.id}
          event={item}
          index={i}
          deleteEvent={deleteEvent}
        />
      );
    });
  };

  return (
    <div style={styles.page}>
      <EventsHeader
        openAddEventModal={() => setAddEventModalIsOpen(true)}
      />
      <div style={styles.eventList}>
        {renderEvents()}
      </div>
      <AddEventModal
        isOpen={addEventModalIsOpen}
        closeModal={closeAddEventModal}
        addEvent={addEvent}
      />
    </div>
  );
};
