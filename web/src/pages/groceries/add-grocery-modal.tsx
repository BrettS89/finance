import { FC, PropsWithChildren, useState } from 'react';
import { styles } from './styles';

import Modal from '@mui/joy/Modal';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';

interface Props extends PropsWithChildren {
  isOpen: boolean;
  closeModal(): void;
  addGrocery(name: string): void;
}

export const AddGroceryModal: FC<Props> = ({ isOpen, closeModal, addGrocery }) => {
  const [name, setName] = useState<string>();

  const onClickAddGrocery = () => {
    if (!name) return;

    addGrocery(name);

    setName(undefined);
  };

  return (
    <Modal open={isOpen} style={{ display: 'flex', alignItems: 'center', padding: 30 }}>
      <div style={styles.modalBody}>
        <Typography>Add Grocery List Item</Typography>

        <div style={styles.modalInputs}>
          <Input
            style={{ marginBottom: 5, backgroundColor:'#121417' }}
            placeholder='Name'
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div>
          <Button
            onClick={onClickAddGrocery}
            disabled={!name}
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
