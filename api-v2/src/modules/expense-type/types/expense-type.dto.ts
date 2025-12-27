export type ExpenseTypeResponseDto = {
  id: bigint;
  name: string;
  frequency: 'week' | 'month' | 'year';
  budget: number;
  description?: string;
  created_at: string;
};

export type CreateExpenseTypeDto = Omit<ExpenseTypeResponseDto, 'id' | 'created_at'>;
