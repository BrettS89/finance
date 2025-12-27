import { FC, PropsWithChildren, useState } from 'react';
import { styles } from './styles';

import Modal from '@mui/joy/Modal';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';

interface Props extends PropsWithChildren {
  isOpen: boolean;
  closeModal(): void;
  addBudgetItem(name: string, amount: number): void;
}

export const AddBudgetItemModal: FC<Props> = ({ isOpen, closeModal, addBudgetItem }) => {
  const [name, setName] = useState<string>();
  const [amount, setAmount] = useState<string>();

  const onClickAddTask = () => {
    if (!name) return;
    if (!amount) return;

    addBudgetItem(name, Number(amount));

    setName(undefined);
  };

  return (
    <Modal open={isOpen} style={{ display: 'flex', alignItems: 'center', padding: 30 }}>
      <div style={styles.modalBody}>
        <Typography>Add Budget Item</Typography>

        <div style={styles.modalInputs}>
          <Input
            style={{ marginBottom: 5, backgroundColor:'#121417' }}
            placeholder='Name'
            onChange={e => setName(e.target.value)}
          />
          <Input
            type='number'
            style={{ marginBottom: 5, backgroundColor:'#121417' }}
            placeholder='Amount'
            onChange={e => setAmount(e.target.value)}
          />
        </div>

        <div>
          <Button
            onClick={onClickAddTask}
            disabled={!name || !amount}
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
