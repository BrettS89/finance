import { FC, PropsWithChildren } from 'react';
import { colors } from '../../styles/colors';
import { styles } from './styles';
import { Budget } from '../../redux/budget/slice';
import Typography from '@mui/joy/Typography';

interface BreakdownItemProps extends PropsWithChildren {
  title: string;
  amount: number;
  color: string;
}

const BreakdownItem: FC<BreakdownItemProps> = ({ title, amount, color }) => {
  const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div style={styles.breakdownItem}>
      <Typography>{title}</Typography>
      <Typography style={{ color }}>{USDollar.format(amount)}</Typography>
    </div>
  );
};

interface BreakdownProps extends PropsWithChildren {
  budgetList: Budget[];
}

export const Breakdown: FC<BreakdownProps> = ({ budgetList }) => {
  const income = 203658;
  const expenses = budgetList.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);

  return (
    <div style={styles.breakdown}>
      <Typography level={'h4'} style={{ marginBottom: 5 }}>Breakdown</Typography>
      <BreakdownItem title='Income' amount={income} color={colors.white} />
      <BreakdownItem title='Expenses' amount={expenses} color={colors.red} />
      <BreakdownItem title='Net Savings' amount={income - expenses} color={colors.green} />
    </div>
  );
};
