import { ExpenseModel } from './types/expense.domain';
import { ExpenseResponseDto } from './types/expense.dto';

export const toExpenseDto = (expense: ExpenseModel): ExpenseResponseDto => {
  return {
    ...expense,
  }
};
