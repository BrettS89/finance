import { FC, PropsWithChildren } from 'react';
import { colors } from '../../styles/colors'
import { LuFileSpreadsheet } from "react-icons/lu";

interface Props extends PropsWithChildren {
  openAddBudgetItemModal(): void;
}

export const BudgetHeader: FC<Props> = ({ openAddBudgetItemModal }) => {

  return (
    <div style={{ textAlign: 'center', display: 'flex',justifyContent: 'space-between', padding: 10, paddingTop: 16, paddingBottom: 16, alignItems: 'center' }}>
      <LuFileSpreadsheet style={{ fontWeight: 700, fontSize: 34, color: colors.green }} />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ fontSize: 18, fontWeight: 700, color: colors.blue, marginLeft: 25 }} onClick={openAddBudgetItemModal}>Add</span>
      </div>
    </div>
  )
};
