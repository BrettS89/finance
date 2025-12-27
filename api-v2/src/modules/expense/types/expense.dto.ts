export type ExpenseResponseDto = {
  id: bigint;
  name: string;
  amount: number;
  expense_type_id: bigint;
  created_at: string;
};

export type CreateExpenseDto = Omit<ExpenseResponseDto, 'id' | 'created_at'>;
export type UpdateExpenseDto = Partial<Omit<ExpenseResponseDto, 'id' | 'created_at'>>;
