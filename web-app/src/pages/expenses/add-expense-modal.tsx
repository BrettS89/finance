import { FC, PropsWithChildren, useState } from 'react';
import { styles } from './styles';

import Modal from '@mui/joy/Modal';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';

interface Props extends PropsWithChildren {
  isOpen: boolean;
  closeModal(): void;
  addExpense(name: string, amount: number): void;
}

export const AddExpenseModal: FC<Props> = ({ isOpen, closeModal, addExpense }) => {
  const [expenseName, setExpenseName] = useState<string>();
  const [expenseAmount, setExpenseAmount] = useState<number>();

  const onClickAddExpense = () => {
    if (!expenseName || !expenseAmount) {
      return;
    }

    addExpense(expenseName, expenseAmount);

    setExpenseName(undefined);
    setExpenseAmount(undefined);
  };

  return (
    <Modal open={isOpen} style={{ display: 'flex', alignItems: 'center', padding: 30 }}>
      <div style={styles.modalBody}>
        <Typography>Add Expense</Typography>

        <div style={styles.modalInputs}>
          <Input
            style={{ marginBottom: 5, backgroundColor:'#121417' }}
            placeholder='Name'
            onChange={e => setExpenseName(e.target.value)}
          />
          <Input
            type='number'
            placeholder='Amount'
            style={{ backgroundColor: '#121417' }}
            onChange={e => setExpenseAmount(Number(e.target.value))}
          />
        </div>

        <div>
          <Button
            onClick={onClickAddExpense}
            disabled={!expenseName || !expenseAmount}
          >
            Add
          </Button>
          <Button
            variant='plain'
            onClick={closeModal}
            
          >Cancel</Button>
        </div>
      </div>
  
    </Modal>
  );
};
