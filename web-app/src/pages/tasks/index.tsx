import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './styles';
import { TasksHeader } from './header';
import { TaskItem } from './item';
import { AddTaskModal } from './add-task-modal';
import { addTask as addTaskAction, patchTask as patchTaskAction, deleteTask as deleteTaskAction, fetchtasks as fetchTasksAction } from '../../redux/task/slice';
import { taskSelector } from '../../redux/store';

export const Tasks = () => {
  const [addTaskModalIsOpen, setAddTaskModalIsOpen] = useState<boolean>(false);

  const dispatch = useDispatch();
  const task = useSelector(taskSelector);

  const addTask = (name: string) => {
    dispatch(addTaskAction({
      callback: closeAddTaskModal,
      data: {
        name,
      },
    }));
  };

  const setTaskCompleted = (id: string, val: boolean) => {
    dispatch(patchTaskAction({ id, data: { completed: val } }));
  };

  const deleteTask = (id: string) => {
    dispatch(deleteTaskAction({ id }));
  };

  const closeAddTaskModal = () => {
    setAddTaskModalIsOpen(false);
  };

  const fetchTasks = () => {
    dispatch(fetchTasksAction());
  };

  const renderTaskList = () => {
    return task.list.map((item, i) => {
      return (
        <TaskItem
          key={item.id}
          item={item}
          index={i}
          deleteTask={deleteTask}
          setTaskCompleted={setTaskCompleted}
        />
      )
    });
  };

  return (
    <div style={styles.page}>
      <TasksHeader
        openAddGroceryModal={() => setAddTaskModalIsOpen(true)}
        fetchTasks={fetchTasks}
      />
      <div style={styles.taskList}>
        {renderTaskList()}
      </div>

      <AddTaskModal
        isOpen={addTaskModalIsOpen}
        closeModal={closeAddTaskModal}
        addTask={addTask}
      />
    </div>
  );
};
