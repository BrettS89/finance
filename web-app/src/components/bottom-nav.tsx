import { FC, PropsWithChildren } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { TbCurrencyDollar } from 'react-icons/tb';
import { MdOutlineLocalGroceryStore, MdCalendarMonth } from 'react-icons/md';
import { LuFileSpreadsheet } from "react-icons/lu";
import { FaRegSquareCheck } from 'react-icons/fa6';
import { colors } from '../styles/colors';

export const BottomNav = () => {
  return (
    <div style={styles.nav}>
      <NavItem name='Expenses' path='/expenses' Icon={({ color }: any) => <TbCurrencyDollar style={{ fontWeight: 700, fontSize: 30, color }} />} />
      <NavItem name='Budget' path='/budget' Icon={({ color }: any) => <LuFileSpreadsheet style={{ fontWeight: 700, fontSize: 26, color }} />} />
      {/* <NavItem name='Groceries' path='/groceries' Icon={({ color }: any) => <MdOutlineLocalGroceryStore style={{ fontWeight: 700, fontSize: 30, color }} />} /> */}
      <NavItem name='Tasks' path='/tasks' Icon={({ color }: any) => <FaRegSquareCheck style={{ fontWeight: 700, fontSize: 26, color }} />} />
      <NavItem name='Events' path='/events' Icon={({ color }: any) => <MdCalendarMonth style={{ fontWeight: 700, fontSize: 28, color }} />} />
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
    paddingBottom: 30,
    paddingTop: 6,
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
    fontSize: 12,
    color: colors.white,
  },
  activeText: {
    fontSize: 12,
    color: colors.blue,
  }
};
