import { FC, PropsWithChildren } from 'react';
import { styles } from './styles';
import { colors } from '../../styles/colors';
import { RxCross2 } from 'react-icons/rx';
import { Task } from '../../redux/task/slice';

interface Props extends PropsWithChildren {
  item: Task
  index: number;
  deleteTask(id: string): void;
  setTaskCompleted(id: string, val: boolean): void;
}

export const TaskItem: FC<Props> = ({ index, item, deleteTask, setTaskCompleted }) => {
  const additionalStyles = index % 2 === 0 ? { background: '#373d48' } : { background: colors.background };
  const striekthrough = item.completed ? { textDecoration: 'line-through' } : {};

  return (
    <div style={{ ...styles.taskItem, ...additionalStyles }}>
      <span style={{ fontWeight: 500, color: colors.white, ...striekthrough }} onClick={() => setTaskCompleted(item.id, !item.completed)}>{item.name}</span>
      <RxCross2 style={{ fontSize: 22, color: colors.red }} onClick={() => deleteTask(item.id)} />
    </div>
  );
};
