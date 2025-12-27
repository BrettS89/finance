export type BudgetResponseDto = {
  id: bigint;
  name: string;
  amount: number;
  created_at: string;
};

export type CreateBudgetDto = Omit<BudgetResponseDto, 'id' | 'created_at'>;
