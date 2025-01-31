import { Routes, Route } from 'react-router';
import { Expenses } from '../pages/expenses';
import { Initializing } from '../pages/initialize';

export const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Initializing/>} />
      <Route path='/expenses' element={<Expenses/>} />
    </Routes>
  );
};
