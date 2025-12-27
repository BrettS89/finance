export type ExpenseRow = {
  id: bigint;
  name: string;
  amount: number;
  expenseTypeId: bigint;
  created_at: Date;
};
