import { useSelector } from 'react-redux';
import { surplusSelector } from '../../redux/store';
import { colors } from '../../styles/colors'
import { TbCurrencyDollar } from 'react-icons/tb';

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
    <div style={{ textAlign: 'center', display: 'flex',justifyContent: 'space-between', padding: 10, paddingTop: 16, paddingBottom: 16, alignItems: 'center' }}>
      <TbCurrencyDollar style={{ fontWeight: 700, fontSize: 34, color: colors.green }} />
      <span style={{ fontSize: 16, fontWeight: 500, color: colors.white }}>Surplus: {renderSurplusAmount()}</span>
    </div>
  )
};
