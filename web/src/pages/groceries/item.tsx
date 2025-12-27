import { FC, PropsWithChildren } from 'react';
import { styles } from './styles';
import { colors } from '../../styles/colors';
import { RxCross2 } from 'react-icons/rx';
import { Grocery } from '../../redux/grocery/slice';

interface Props extends PropsWithChildren {
  item: Grocery
  index: number;
  deleteGrocery(id: string): void;
  setGroceryAsInCart(id: string, val: boolean): void;
}

export const GroceryItem: FC<Props> = ({ index, item, deleteGrocery, setGroceryAsInCart }) => {
  const additionalStyles = index % 2 === 0 ? { background: '#373d48' } : { background: colors.background };
  const striekthrough = item.inCart ? { textDecoration: 'line-through' } : {};

  return (
    <div style={{ ...styles.groceryItem, ...additionalStyles }}>
      <span style={{ fontWeight: 500, color: colors.white, ...striekthrough }} onClick={() => setGroceryAsInCart(item.id, !item.inCart)}>{item.name}</span>
      <RxCross2 style={{ fontSize: 22, color: colors.red }} onClick={() => deleteGrocery(item.id)} />
    </div>
  );
};
