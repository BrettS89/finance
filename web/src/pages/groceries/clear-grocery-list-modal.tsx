import { FC, PropsWithChildren } from 'react';
import { styles } from './styles';

import Modal from '@mui/joy/Modal';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';

interface Props extends PropsWithChildren {
  isOpen: boolean;
  closeModal(): void;
  clearGroceryList(): void;
}

export const ClearGroceryListModal: FC<Props> = ({ isOpen, closeModal, clearGroceryList }) => {
  const onClickYes = () => {
    clearGroceryList();
  };

  return (
    <Modal open={isOpen} style={{ display: 'flex', alignItems: 'center', padding: 30 }}>
      <div style={styles.modalBody}>
        <Typography>Are you sure you want to clear the grocery list?</Typography>

        <div style={{ marginTop: 30 }}>
          <Button
            onClick={onClickYes}
          >
            Yes
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
