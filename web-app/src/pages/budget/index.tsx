import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { budgetSelector } from '../../redux/store';
import { BudgetHeader } from './header';
import { BudgetItem } from './item';
import { Breakdown } from './breakdown';
import { styles } from './styles';
import { AddBudgetItemModal } from './add-budget-modal';
import { addBudget as addBudgetItemAction, deleteBudget as deleteBudgetItemAction } from '../../redux/budget/slice';

export const Budget = () => {
  const [addBudgetItemModalOpen, setAddBudgetItemModalOpen] = useState<boolean>(false);

  const budget = useSelector(budgetSelector);
  const dispatch = useDispatch();

  const addBudgetItem = (name: string, amount: number) => {
      dispatch(addBudgetItemAction({
        callback: closeAddBudgetItemModal,
        data: {
          name,
          amount
        },
      }));
    };
  
  const deleteBudgetItem = (id: string) => {
    dispatch(deleteBudgetItemAction({ id }));
  };

  const closeAddBudgetItemModal = () => {
    setAddBudgetItemModalOpen(false);
  };
  
  const renderBudgetItems = () => {
    return budget.list.map((item, i) => {
      return (
        <BudgetItem
          key={item.id}
          item={item}
          index={i}
          deleteBudgetItem={deleteBudgetItem}
        />
      );
    });
  };

  return (
    <div style={styles.page}>
      <BudgetHeader
        openAddBudgetItemModal={() => setAddBudgetItemModalOpen(true)}
      />
      <div style={styles.scrollable}>
        {renderBudgetItems()}
      </div>
      <Breakdown budgetList={budget.list} />
      <AddBudgetItemModal
        addBudgetItem={addBudgetItem}
        isOpen={addBudgetItemModalOpen}
        closeModal={closeAddBudgetItemModal}
      />
    </div>
  );
};
