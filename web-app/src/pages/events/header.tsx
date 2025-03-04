import { FC, PropsWithChildren } from 'react';
import { colors } from '../../styles/colors'
import { MdOutlineLocalGroceryStore, MdCalendarMonth } from 'react-icons/md';
import { WiCloudRefresh } from 'react-icons/wi';

interface Props extends PropsWithChildren {
  openAddEventModal(): void;
  // fetchTasks(): void;
}

export const EventsHeader: FC<Props> = ({ openAddEventModal }) => {

  return (
    <div style={{ textAlign: 'center', display: 'flex',justifyContent: 'space-between', padding: 10, paddingTop: 16, paddingBottom: 16, alignItems: 'center' }}>
      <MdCalendarMonth style={{ fontWeight: 700, fontSize: 34, color: colors.green }} />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <WiCloudRefresh style={{ fontSize: 36, marginRight: 30, color: colors.blue }} onClick={() => {}} />
      <span style={{ fontSize: 18, fontWeight: 700, color: colors.blue }} onClick={openAddEventModal}>Add</span>
      </div>
    </div>
  )
};
