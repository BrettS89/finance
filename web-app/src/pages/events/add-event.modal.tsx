import { FC, PropsWithChildren, useState } from 'react';
import { styles } from './styles';

import Modal from '@mui/joy/Modal';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import { DateInput } from '../../components/datepicker';
import { TimeInput } from '../../components/timepicker';

interface Props extends PropsWithChildren {
  isOpen: boolean;
  closeModal(): void;
  addEvent(name: string, datetime: string): void;
}

export const AddEventModal: FC<Props> = ({ isOpen, closeModal, addEvent }) => {
  const [name, setName] = useState<string>();
  const [date, setDate] = useState<string>();
  const [time, setTime] = useState<string>();

  const onClickAddEvent = () => {
    if (!name) return;
    if (!date) return;
    if (!time) return;

    const datetime = new Date(`${date} ${time}`);

    addEvent(name, datetime.toISOString());

    setName(undefined);
    setDate(undefined);
    setTime(undefined);
  };

  return (
    <Modal open={isOpen} style={{ display: 'flex', alignItems: 'center', padding: 30 }}>
      <div style={styles.modalBody}>
        <Typography>Add Task</Typography>

        <div style={styles.modalInputs}>
          <Input
            style={{ marginBottom: 5, backgroundColor:'#121417' }}
            placeholder='Name'
            onChange={e => setName(e.target.value)}
          />
          <DateInput onChange={(val) => setDate(val)} />
          <TimeInput onChange={(val) => setTime(val)}  />
        </div>

        <div>
          <Button
            onClick={onClickAddEvent}
            disabled={!name || !time || !date}
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
