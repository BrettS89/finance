export type ExpenseTypeRow = {
  id: bigint;
  name: string;
  frequency: 'week' | 'month' | 'year';
  budget: number;
  description?: string;
  created_at: string;
}
