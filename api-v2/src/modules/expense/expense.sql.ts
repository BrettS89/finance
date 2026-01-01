export const BEGIN_TRANSACTION = `
  BEGIN;
  SET LOCAL lock_timeout = '2s';
`;

export const GET_EXISTING_EXPENSES_WITH_BUDGET = `
  SELECT
    COALESCE(SUM(e.amount), 0) AS total,
    et.budget
  FROM expense_types et
  LEFT JOIN expenses e
    ON e.expense_type_id = et.id
  WHERE et.id = $1
  GROUP BY et.id, et.budget
`;

export const GET_EXISTING_EXPENSES_WITH_BUDGET_FOR_DELETE = `
  SELECT
    COALESCE(SUM(e.amount), 0) AS total,
    et.budget
  FROM expense_types et
  LEFT JOIN expenses e
    ON e.expense_type_id = et.id
  WHERE et.id = $1
  GROUP BY et.id, et.budget;
`;

export const UPDATE_SURPLUS = `
  WITH s AS (
    SELECT id, amount
    FROM surplus
    ORDER BY id
    LIMIT 1
    FOR UPDATE
  )
  UPDATE surplus AS su
  SET amount =
    CASE
      WHEN ABS($1) >= $2
        THEN s.amount - $2
      ELSE
        s.amount + $1
    END
  FROM s
  WHERE su.id = s.id
  RETURNING su.id, su.amount
`;

export const GET_EXPENSE_TYPE_FOR_DELETE = `
  SELECT id, expense_type_id, amount
  FROM expenses
  WHERE id = $1
  FOR UPDATE
`;

export const UPDATE_SURPLUS_ON_DELETE = `
  WITH s AS (
    SELECT id
    FROM surplus
    ORDER BY id
    LIMIT 1
    FOR UPDATE
  )
  UPDATE surplus AS su
  SET amount = su.amount + LEAST(ABS($1), $2)
  FROM s
  WHERE su.id = s.id
`