import { FC, PropsWithChildren } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { TbCurrencyDollar } from 'react-icons/tb';
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { FaRegSquareCheck } from "react-icons/fa6";
import { colors } from '../styles/colors';

export const BottomNav = () => {
  return (
    <div style={styles.nav}>
      <NavItem name='Expenses' path='/expenses' Icon={({ color }: any) => <TbCurrencyDollar style={{ fontWeight: 700, fontSize: 30, color }} />} />
      <NavItem name='Groceries' path='/groceries' Icon={({ color }: any) => <MdOutlineLocalGroceryStore style={{ fontWeight: 700, fontSize: 30, color }} />} />
      <NavItem name='Tasks' path='/tasks' Icon={({ color }: any) => <FaRegSquareCheck style={{ fontWeight: 700, fontSize: 26, color }} />} />
    </div>
  );
};

export const NavItem: FC<PropsWithChildren<{ name: string; Icon: any; path: string; }>> = ({ name, Icon, path }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const color = path === location.pathname ? colors.blue : colors.white;

  const renderText = () => {
    if (location.pathname === path) {
      return <span style={styles.activeText}>{name}</span>
    }

    return <span style={styles.text}>{name}</span>
  }
 
  return (
    <div style={styles.navItem} onClick={() => navigate(path)}>
      <div style={{ height: 37, display: 'flex', alignItems: 'center' }}>
        <Icon color={color} />
      </div>
      
      {renderText()}
    </div>
  );
};

const styles = {
  nav: {
    display: 'flex',
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 35,
    paddingTop: 7,
    borderTop: `1px solid ${colors.border}`,
    justifyContent: 'space-between',
  },
  navItem: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    width: 65,
  },
  text: {
    fontSize: 14,
  },
  activeText: {
    fontSize: 14,
    color: colors.blue,
  }
};