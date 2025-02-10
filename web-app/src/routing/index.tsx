import { Routes, Route } from 'react-router';
import { Expenses } from '../pages/expenses';
import { Initializing } from '../pages/initialize';
import { Groceries } from '../pages/groceries';
import { Tasks } from '../pages/tasks';

export const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Initializing/>} />
      <Route path='/expenses' element={<Expenses/>} />
      <Route path='/groceries' element={<Groceries />} />
      <Route path='/tasks' element={<Tasks />} />
    </Routes>
  );
};
