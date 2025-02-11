import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './styles';
import { GroceryHeader } from './header';
import { GroceryItem } from './item';
import { AddGroceryModal } from './add-grocery-modal';
import { ClearGroceryListModal } from './clear-grocery-list-modal';
import { addGrocery as addGroceryAction, deleteGrocery as deleteGroceryAction, patchGrocery as patchGroceryAction,  batchDeleteGroceries as batchDeleteGroceriesAction, fetchGroceries as fetchGroceriesAction } from '../../redux/grocery/slice';
import { grocerySelector } from '../../redux/store';

export const Groceries = () => {
  const [addGroceryModalIsOpen, setAddGroceryModalIsOpen] = useState<boolean>(false);
  const [clearGroceryListModalIsOpen, setClearGroceryListModalIsOpen] = useState<boolean>(false);

  const dispatch = useDispatch();
  const grocery = useSelector(grocerySelector);

  const addGrocery = (name: string) => {
    dispatch(addGroceryAction({
      callback: closeAddGroceryModal,
      data: {
        name,
      },
    }));
  };

  const setGroceryAsInCart = (id: string, val: boolean) => {
    dispatch(patchGroceryAction({ id, data: { inCart: val } }));
  };

  const deleteGrocery = (id: string) => {
    dispatch(deleteGroceryAction({ id }));
  };

  const clearGroceryList = () => {
    dispatch(batchDeleteGroceriesAction());
    setClearGroceryListModalIsOpen(false);
  };

  const closeAddGroceryModal = () => {
    setAddGroceryModalIsOpen(false);
  };

  const fetchGroceries = () => {
    dispatch(fetchGroceriesAction());
  }

  const renderGroceryList = () => {
    return grocery.list.map((item, i) => {
      return (
        <GroceryItem
          key={item.id}
          item={item}
          index={i}
          deleteGrocery={deleteGrocery}
          setGroceryAsInCart={setGroceryAsInCart}
        />
      )
    });
  };

  return (
    <div style={styles.page}>
      <GroceryHeader
        openAddGroceryModal={() => setAddGroceryModalIsOpen(true)}
        openClearGroceryListModal={() => setClearGroceryListModalIsOpen(true)}
        fetchGroceries={fetchGroceries}
      />
      <div style={styles.groceryList}>
        {renderGroceryList()}
      </div>

      <AddGroceryModal
        isOpen={addGroceryModalIsOpen}
        closeModal={closeAddGroceryModal}
        addGrocery={addGrocery}
      />
      <ClearGroceryListModal
        isOpen={clearGroceryListModalIsOpen}
        closeModal={() => setClearGroceryListModalIsOpen(false)}
        clearGroceryList={clearGroceryList}
      />
    </div>
  );
};
