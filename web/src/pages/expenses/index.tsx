import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { expenseTypesSelector } from '../../redux/store';
import { addExpense as addExpenseAction } from '../../redux/expense/slice';
import { addExpenseType as addExpenseTypeAction } from '../../redux/expense-type/slice';
import { styles } from './styles';
import Typography from '@mui/joy/Typography'
import { ExpenseType } from './expense-type'
import { AddExpenseModal } from './add-expense-modal';
import { colors } from '../../styles/colors';
import { IoIosAddCircle } from "react-icons/io";
import { AddExpenseTypeModal } from './add-expense-type-modal';
import { ExpensesHeader } from './header';

export const Expenses = () => {
  const [viewExpenseModalOpen, setViewExpenseModalOpen] = useState(false);
  const [expense_type_idForAddingExpense, setexpense_type_idForAddingExpense] = useState<string | null>(null);
  const [addExpenseTypeModalOpen, setAddExpenseTypeModalOpen] = useState<boolean>(false);
  const [frequency, setFrequency] = useState<'week' | 'month' | 'year'>();

  const dispatch = useDispatch();
  const expenseTypes = useSelector(expenseTypesSelector);

  const openAddExpenseModal = (expense_type_id: string) => {
    setexpense_type_idForAddingExpense(expense_type_id);
    setViewExpenseModalOpen(true);
  };

  const closeAddExpenseModal = () => {
    setexpense_type_idForAddingExpense(null);
    setViewExpenseModalOpen(false);
  };

  const openExpenseTypeModal = (frequency: 'week' | 'month' | 'year') => {
    setAddExpenseTypeModalOpen(true);
    setFrequency(frequency);
  };

  const closeExpenseTypeModal = () => {
    setAddExpenseTypeModalOpen(false);
    setFrequency(undefined);
  };

  const addExpense = (name: string, amount: number) => {
    if (!expense_type_idForAddingExpense) {
      alert('Must include the type of expense');
      return;
    }
    
    dispatch(addExpenseAction({
      data: {
        name,
        amount,
        expense_type_id: expense_type_idForAddingExpense,
      },
      callback: closeAddExpenseModal,
    }));
  };

  const addExpenseType = (name: string, budget: number) => {
    if (!frequency) {
      alert('Expense type must have a frequency');
      return;
    }

    dispatch(addExpenseTypeAction({
      callback: closeExpenseTypeModal,
      data: {
        name,
        budget,
        frequency,
      },
    }));
  };

  const renderExpenseTypes = (frequency: 'week' | 'month' | 'year') => {
    return expenseTypes
      .filter(exp => exp.frequency === frequency)
      .map(exp => {
        return (
          <ExpenseType
            key={exp.id}
            expenseType={exp}
            openAddExpenseModal={openAddExpenseModal}
          />
        );
      });
  };

  return (
    <div style={styles.page}>
      <ExpensesHeader/>
      <div style={styles.scrollable}>

        <div style={styles.cardShadow}>
          <div style={styles.cardContainer}>
            <div style={styles.card}>
              <div style={styles.header}>
                <Typography style={styles.headerText}>
                  Weekly Expenses
                </Typography>
                <IoIosAddCircle
                  style={{ marginRight: 5,  fontSize: 32, color: colors.white }}
                  onClick={() => openExpenseTypeModal('week')}
                />
              </div>
          
              {renderExpenseTypes('week')}
            </div>
          </div>
        </div>

        <div style={styles.cardShadow}>
          <div style={styles.cardContainer}>
            <div style={styles.card}>
              <div style={styles.header}>
                <Typography style={styles.headerText}>
                  Monthly Expenses
                </Typography>
                <IoIosAddCircle
                  style={{ marginRight: 5,  fontSize: 32, color: colors.white }}
                  onClick={() => openExpenseTypeModal('month')}
                />
              </div>
              
              {renderExpenseTypes('month')}
            </div>
          </div>
        </div>
         
        
        <div style={styles.cardShadow}>
          <div style={styles.cardContainer}>
            <div style={styles.card}>
                <div style={styles.header}>
                  <Typography style={styles.headerText}>
                    Annual Expenses
                  </Typography>
                  <IoIosAddCircle
                    style={{ marginRight: 5,  fontSize: 32, color: colors.white }}
                    onClick={() => openExpenseTypeModal('year')}
                  />
                </div>
                {renderExpenseTypes('year')}
              </div>
            </div>
          </div>
        </div>
        
     

      <AddExpenseModal
        isOpen={viewExpenseModalOpen}
        closeModal={closeAddExpenseModal}
        addExpense={addExpense}
      />

      <AddExpenseTypeModal
        isOpen={addExpenseTypeModalOpen}
        closeModal={closeExpenseTypeModal}
        addExpenseType={addExpenseType}
      />
      
    </div>
  );
};
