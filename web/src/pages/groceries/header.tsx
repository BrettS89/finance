import { FC, PropsWithChildren } from 'react';
import { colors } from '../../styles/colors'
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { WiCloudRefresh } from "react-icons/wi";

interface Props extends PropsWithChildren {
  openAddGroceryModal(): void;
  openClearGroceryListModal(): void;
  fetchGroceries(): void;
}

export const GroceryHeader: FC<Props> = ({ openAddGroceryModal, openClearGroceryListModal, fetchGroceries }) => {

  return (
    <div style={{ textAlign: 'center', display: 'flex',justifyContent: 'space-between', padding: 10, paddingTop: 16, paddingBottom: 16, alignItems: 'center' }}>
      <MdOutlineLocalGroceryStore style={{ fontWeight: 700, fontSize: 34, color: colors.green }} />
      {/* <span style={{ fontWeight: }}>Grocery List</span> */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <WiCloudRefresh style={{ fontSize: 36, marginRight: 30, color: colors.blue }} onClick={fetchGroceries} />
      <span style={{ fontSize: 18, fontWeight: 700, color: colors.blue }} onClick={openClearGroceryListModal}>Clear</span>
      <span style={{ fontSize: 18, fontWeight: 700, color: colors.blue, marginLeft: 25 }} onClick={openAddGroceryModal}>Add</span>
      </div>
    </div>
  )
};
