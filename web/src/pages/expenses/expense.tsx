import { FC, PropsWithChildren } from 'react';
import { useDispatch } from 'react-redux';
import { deleteExpense as deleteExpenseAction } from '../../redux/expense/slice';
import Typography from '@mui/joy/Typography';
import { Expense as Exp } from '../../redux/expense/slice';
import { styles } from './styles';
import { RxCross2 } from 'react-icons/rx';
import { colors } from '../../styles/colors';

interface Props extends PropsWithChildren {
  expense: Exp;
}

export const Expense: FC<Props> = ({ expense }) => {
  const dispatch = useDispatch();

  const deleteExpense = () => {
    dispatch(deleteExpenseAction({ id: expense.id }));
  };

  return (
    <div style={styles.expense}>
      <Typography style={styles.expenseText}>{expense.name}</Typography>
      <div style={styles.expenseRight}>
        <Typography style={styles.expenseText}>${expense.amount.toFixed(2)}</Typography>
        <RxCross2
          style={{ marginLeft: 10, color: colors.red }}
          onClick={deleteExpense}
        />
      </div>
    </div>
  );
};
