import { PropsWithChildren, FC } from 'react';
import { Event } from '../../redux/event/slice';
import { styles } from './styles';
import { RxCross2 } from 'react-icons/rx';
import { colors } from '../../styles/colors';

import Typography from '@mui/joy/Typography';

interface Props extends PropsWithChildren {
  event: Event;
}

export const EventItem: FC<Props> = ({ event }) => {
  return (
    <div style={styles.eventItem}>
      <div style={styles.eventItemTopRow}>
        <Typography>
          {event.name}
        </Typography>
        <div>
          <RxCross2 style={{ marginLeft: 10, color: colors.red }} />
        </div>
      </div>
    </div>
  );
};
