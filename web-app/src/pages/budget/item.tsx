import { FC, PropsWithChildren } from 'react';
import { styles } from './styles';
import { colors } from '../../styles/colors';
import { RxCross2 } from 'react-icons/rx';
import { Budget } from '../../redux/budget/slice';
import Typography from '@mui/joy/Typography';

interface Props extends PropsWithChildren {
  item: Budget
  index: number;
  deleteBudgetItem(id: string): void;
}

export const BudgetItem: FC<Props> = ({ index, item, deleteBudgetItem }) => {
  const additionalStyles = index % 2 === 0 ? { background: '#373d48' } : { background: colors.background };

  return (
    <div style={{ ...styles.budgetItem, ...additionalStyles }}>
      <span style={{ fontWeight: 500, color: colors.white }}>{item.name}</span>
      <div style={{ display: 'flex' }}>
        <Typography style={{ color: colors.green, marginRight: 10 }}>${item.amount.toFixed(2)}</Typography>
        <RxCross2 style={{ fontSize: 22, color: colors.red }} onClick={() => deleteBudgetItem(item.id)} />
      </div>
    </div>
  );
};
