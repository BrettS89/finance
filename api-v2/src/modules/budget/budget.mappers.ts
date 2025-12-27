import { BudgetResponseDto } from './types/budget.dto';
import { BudgetModel } from './types/budget.domain';

export const toBudgetDto = (budget: BudgetModel): BudgetResponseDto => {
  return {
    ...budget,
  };
};
