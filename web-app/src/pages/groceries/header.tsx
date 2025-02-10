import { FC, PropsWithChildren } from 'react';
import { useDispatch } from 'react-redux';
import { colors } from '../../styles/colors'
import { MdOutlineLocalGroceryStore } from "react-icons/md";

interface Props extends PropsWithChildren {
  openAddGroceryModal(): void;
  openClearGroceryListModal(): void;
}

export const GroceryHeader: FC<Props> = ({ openAddGroceryModal, openClearGroceryListModal }) => {

  return (
    <div style={{ textAlign: 'center', display: 'flex',justifyContent: 'space-between', padding: 10, paddingTop: 16, paddingBottom: 16, alignItems: 'center' }}>
      <MdOutlineLocalGroceryStore style={{ fontWeight: 700, fontSize: 34, color: colors.green }} />
      {/* <span style={{ fontWeight: }}>Grocery List</span> */}
      <div>
      <span style={{ fontSize: 18, fontWeight: 700, color: colors.blue }} onClick={openClearGroceryListModal}>Clear</span>
      <span style={{ fontSize: 18, fontWeight: 700, color: colors.blue, marginLeft: 25 }} onClick={openAddGroceryModal}>Add</span>
      </div>
    </div>
  )
};
