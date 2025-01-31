import './App.css';
import { useEffect, useState } from 'react';
import { Router } from './routing';
import { useColorScheme } from '@mui/joy/styles';
import { colors } from './styles/colors';
import { TbCurrencyDollar } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { fetchExpenseTypes, fetchExpenses, fetchSurplus } from './api/calls';
import { expenseTypesFetched } from './redux/expense-type/slice';
import { expensesFetched } from './redux/expense/slice';
import { surplusFetched } from './redux/surplus/slice';
import { surplusSelector } from './redux/store';

function App() {
  const [isInitialized, setIsInitialised] = useState<boolean>(false);

  const { setMode } = useColorScheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const surplus = useSelector(surplusSelector);

  const loadInitialData = async () => {
    const promises = [
      fetchExpenseTypes(),
      fetchExpenses(),
      fetchSurplus()
    ];

    try {
      const [
        expenseTypes,
        expenses,
        surplus,
      ] = await Promise.all(promises);
  
      dispatch(expenseTypesFetched(expenseTypes));
      dispatch(expensesFetched(expenses));
      dispatch(surplusFetched(surplus));
      
      setIsInitialised(true);
      navigate('/expenses');
    } catch(e) {
      if (e instanceof Error) {
        alert(e.message);
      }
    }
  };

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

  useEffect(() => {
    setMode('dark');
    loadInitialData();
  }, []);

  return (
    <>
      <div style={{ textAlign: 'center', display: 'flex',justifyContent: 'space-between', padding: 10, paddingTop: 16, paddingBottom: 16, alignItems: 'center' }}>
        <TbCurrencyDollar style={{ fontWeight: 700, fontSize: 34, color: colors.green }} />
        <span style={{ fontSize: 16, fontWeight: 500, color: colors.white }}>Surplus: {renderSurplusAmount()}</span>
      </div>
      {isInitialized && (
        <Router/>
      )}
    </>
  );
}

export default App;
