import { FC, PropsWithChildren, useState } from 'react';
import { useSelector } from 'react-redux';
import { expensesSelector } from '../../redux/store';
import { ExpenseType as ExpType } from '../../redux/expense-type/slice';
import { styles } from './styles';
import { GrFormAdd } from "react-icons/gr";
import { colors } from '../../styles/colors';
import { Expense } from './expense';

import Typography from '@mui/joy/Typography';

interface Props extends PropsWithChildren {
  expenseType: ExpType;
  openAddExpenseModal(expense_type_id: string): void;
}

export const ExpenseType: FC<Props> = ({ expenseType, openAddExpenseModal }) => {
  const [viewExpenses, setViewExpenses] = useState<boolean>(false);

  const expenses = useSelector(expensesSelector)
    .filter(exp => exp.expense_type_id === expenseType.id);

  const totalSpent = expenses.reduce((acc: number, curr) => {
    return acc + curr.amount;
  }, 0)

  const renderExpenses = () => {
    return expenses.map(exp => {
      return (
        <Expense
          key={exp.id}
          expense={exp}
        />
      )
    });
  };

  const renderExpenseStatus = () => {
    const str = `$${totalSpent.toFixed(2)} / $${expenseType.budget}`;

    if (totalSpent > expenseType.budget) {
      return (
        <Typography style={{ ...styles.expenseTypeText, color: colors.red }}>
          {str}
        </Typography>
      )
    }

    return (
      <Typography style={{ ...styles.expenseTypeText, color: colors.green }}>
        {str}
      </Typography>
    )
  }

  return (
    <div style={styles.expenseTypeList}>
      <div style={styles.expenseTypeHeader}>
        <Typography style={styles.expenseTypeText} onClick={() => setViewExpenses(!viewExpenses)}>
          {expenseType.name}
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography style={styles.expenseTypeText}>
            {renderExpenseStatus()}
          </Typography>
          <GrFormAdd
            style={{ marginLeft: 5, fontSize: 32, color: colors.blue }}
            onClick={() => openAddExpenseModal(expenseType.id)}
          />
        </div>
        
      </div>
      {viewExpenses && (
        <div style={styles.expenseList}>
          {renderExpenses()}
        </div>
      )}
      
    </div>
  )
};
