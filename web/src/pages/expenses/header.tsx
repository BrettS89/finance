import { useSelector } from 'react-redux';
import { surplusSelector } from '../../redux/store';
import { colors } from '../../styles/colors'
import { TbCurrencyDollar } from 'react-icons/tb';
import { styles } from './styles';

export const ExpensesHeader = () => {
  const surplus = useSelector(surplusSelector);

  const renderSurplusAmount = () => {
    if (surplus.amount < 0) {
      return (
        <span style={{ fontSize: 16, fontWeight: 500, color: colors.red }}>${surplus.amount.toFixed(2)}</span>
      );
    }

    return (
      <span style={{ fontSize: 16, fontWeight: 500, color: colors.green }}>${surplus.amount.toFixed(2)}</span>
    );
  }

  return (
    <div style={styles.headerShadow}>
      <div style={styles.cardContainer}>
        <div style={styles.mainHeader}>
          <TbCurrencyDollar style={{ fontWeight: 700, fontSize: 34, color: colors.green }} />
          <span style={{ fontSize: 16, fontWeight: 500, color: colors.white, marginLeft: 10 }}><span style={{ opacity: 0.7 }}>Surplus:</span> {renderSurplusAmount()}</span>
        </div>
      </div>
    </div>
    
  )
};
