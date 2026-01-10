import './App.css';
import { useEffect, useState } from 'react';
import { Router } from './routing';
import { useColorScheme } from '@mui/joy/styles';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { fetchExpenseTypes, fetchExpenses, fetchSurplus, fetchGroceries, fetchTasks, fetchEvents, fetchBudget } from './api/calls';
import { expenseTypesFetched } from './redux/expense-type/slice';
import { expensesFetched } from './redux/expense/slice';
import { surplusFetched } from './redux/surplus/slice';
import { groceriesFetched } from './redux/grocery/slice';
import { tasksFetched } from './redux/task/slice';
import { BottomNav } from './components/bottom-nav';
import { colors } from './styles/colors';
import { eventsFetched } from './redux/event/slice';
import { budgetsFetched } from './redux/budget/slice';

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
      // fetchGroceries(),
      // fetchTasks(),
      // fetchEvents(),
      fetchBudget(),
    ];

    try {
      const [
        expenseTypes,
        expenses,
        surplus,
        // groceries,
        // tasks,
        // events,
        budgets,
      ] = await Promise.all(promises);
  
      dispatch(expenseTypesFetched(expenseTypes));
      dispatch(expensesFetched(expenses));
      dispatch(surplusFetched(surplus));
      // dispatch(groceriesFetched(groceries));
      // dispatch(tasksFetched(tasks));
      // dispatch(eventsFetched(events));
      dispatch(budgetsFetched(budgets));
      
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
      {isInitialized ? (
        <Router/>
      ) : <div style={{ padding: 10, color: colors.white }}>Loading...</div>}

      <BottomNav/>
    </div>
  );
}

export default App;
