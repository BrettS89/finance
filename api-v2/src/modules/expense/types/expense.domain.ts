export type ExpenseModel = {
  id: bigint;
  name: string;
  amount: number;
  expenseTypeId: bigint;
  created_at: Date;
};
