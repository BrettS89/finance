import { FC, PropsWithChildren, useState } from 'react';
import { styles } from './styles';

import Modal from '@mui/joy/Modal';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';

interface Props extends PropsWithChildren {
  isOpen: boolean;
  closeModal(): void;
  addExpenseType(name: string, amount: number): void;
}

export const AddExpenseTypeModal: FC<Props> = ({ isOpen, closeModal, addExpenseType }) => {
  const [expenseTypeName, setExpenseTypeName] = useState<string>();
  const [expenseTypeBudget, setExpenseTypeBudget] = useState<number>();

  const onClickAddExpense = () => {
    if (!expenseTypeName || !expenseTypeBudget) {
      return;
    }

    addExpenseType(expenseTypeName, expenseTypeBudget);

    setExpenseTypeName(undefined);
    setExpenseTypeBudget(undefined);
  };

  return (
    <Modal open={isOpen} style={{ display: 'flex', alignItems: 'center', padding: 30 }}>
      <div style={styles.modalBody}>
        <Typography style={{ fontWeight: 600 }}>Add Expense Type</Typography>

        <div style={styles.modalInputs}>
          <Input
            style={{ marginBottom: 5, backgroundColor:'#121417' }}
            placeholder='Name'
            onChange={e => setExpenseTypeName(e.target.value)}
          />
          <Input
            type='number'
            placeholder='Amount'
            style={{ backgroundColor: '#121417' }}
            onChange={e => setExpenseTypeBudget(Number(e.target.value))}
          />
        </div>

        <div>
          <Button
            onClick={onClickAddExpense}
            disabled={!expenseTypeName || !expenseTypeBudget}
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
