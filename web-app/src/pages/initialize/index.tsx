import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { fetchExpenseTypes, fetchExpenses, fetchSurplus } from '../../api/calls';
import { expenseTypesFetched } from '../../redux/expense-type/slice';
import { expensesFetched } from '../../redux/expense/slice';
import { surplusFetched } from '../../redux/surplus/slice';

export const Initializing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

      navigate('/expenses');
    } catch(e) {
      if (e instanceof Error) {
        alert(e.message);
      }
    }
  };

  useEffect(() => {
    loadInitialData();
  });

  return (
    <>Loading...</>
  );
};
