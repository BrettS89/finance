import './App.css';
import { useEffect, useState } from 'react';
import { Router } from './routing';
import { useColorScheme } from '@mui/joy/styles';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { fetchExpenseTypes, fetchExpenses, fetchSurplus, fetchGroceries } from './api/calls';
import { expenseTypesFetched } from './redux/expense-type/slice';
import { expensesFetched } from './redux/expense/slice';
import { surplusFetched } from './redux/surplus/slice';
import { groceriesFetched } from './redux/grocery/slice';
import { BottomNav } from './components/bottom-nav';

function App() {
  const [isInitialized, setIsInitialised] = useState<boolean>(false);

  const { setMode } = useColorScheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loadInitialData = async () => {
    const promises = [
      fetchExpenseTypes(),
      fetchExpenses(),
      fetchSurplus(),
      fetchGroceries(),
    ];

    try {
      const [
        expenseTypes,
        expenses,
        surplus,
        groceries,
      ] = await Promise.all(promises);
  
      dispatch(expenseTypesFetched(expenseTypes));
      dispatch(expensesFetched(expenses));
      dispatch(surplusFetched(surplus));
      dispatch(groceriesFetched(groceries));
      
      setIsInitialised(true);
      navigate('/expenses');
    } catch(e) {
      if (e instanceof Error) {
        alert(e.message);
      }
    }
  };

  useEffect(() => {
    setMode('dark');
    loadInitialData();
  }, []);

  return (
    <div className='app'>
      {isInitialized && (
        <Router/>
      )}

      <BottomNav/>
    </div>
  );
}

export default App;
