import { PropsWithChildren, FC } from 'react';
import { Event } from '../../redux/event/slice';
import { styles } from './styles';
import { RxCross2 } from 'react-icons/rx';
import { colors } from '../../styles/colors';

import Typography from '@mui/joy/Typography';

interface Props extends PropsWithChildren {
  event: Event;
  index: number
  deleteEvent(id: string): void;
}

export const EventItem: FC<Props> = ({ event, index, deleteEvent }) => {
  const additionalStyles = index % 2 === 0 ? { background: '#373d48' } : { background: colors.background };

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  } as any;

  const formattedDateTime = new Date(event.datetime).toLocaleDateString('en-US', options);

  return (
    <div style={{ ...styles.eventItem, ...additionalStyles }}>
      <div style={styles.eventItemTopRow}>
        <Typography style={{ fontWeight: 500, marginBottom: 5 }}>
          {event.name}
        </Typography>
        <div>
          <RxCross2 style={{ marginLeft: 10, color: colors.red, fontSize: 22 }} onClick={() => deleteEvent(event.id)} />
        </div>
      </div>
      <div>
        <Typography>
          {formattedDateTime}
        </Typography>
      </div>
    </div>
  );
};
