import { FC, PropsWithChildren } from 'react';
import { colors } from '../../styles/colors'
import { FaRegSquareCheck } from 'react-icons/fa6';
import { WiCloudRefresh } from 'react-icons/wi';

interface Props extends PropsWithChildren {
  openAddGroceryModal(): void;
  fetchTasks(): void;
}

export const TasksHeader: FC<Props> = ({ openAddGroceryModal, fetchTasks }) => {

  return (
    <div style={{ textAlign: 'center', display: 'flex',justifyContent: 'space-between', padding: 10, paddingTop: 16, paddingBottom: 16, alignItems: 'center' }}>
      <FaRegSquareCheck style={{ fontWeight: 700, fontSize: 34, color: colors.green }} />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <WiCloudRefresh style={{ fontSize: 36, marginRight: 30, color: colors.blue }} onClick={fetchTasks} />
      <span style={{ fontSize: 18, fontWeight: 700, color: colors.blue }} onClick={openAddGroceryModal}>Add</span>
      </div>
    </div>
  )
};
