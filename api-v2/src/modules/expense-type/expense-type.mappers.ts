import { ExpenseTypeModel } from './types/expense-type.domain';
import { ExpenseTypeResponseDto } from './types/expense-type.dto';

export const toExpenseTypeDto = (expenseType: ExpenseTypeModel): ExpenseTypeResponseDto => {
  console.log(expenseType);
  return {
    ...expenseType,
  };
};
