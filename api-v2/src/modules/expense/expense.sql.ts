import { TABLES } from '../../storage/db/postgres/tables';

export const BEGIN_TRANSACTION = `
  BEGIN;
  SET LOCAL lock_timeout = '2s';
`;

export const GET_EXISTING_EXPENSES_WITH_BUDGET = `
  SELECT
    COALESCE(SUM(e.amount), 0) AS total,
    et.budget
  FROM ${TABLES.EXPENSE_TYPES} et
  LEFT JOIN ${TABLES.EXPENSES} e
    ON e.expense_type_id = et.id
  WHERE et.id = $1
  GROUP BY et.id, et.budget
`;

export const UPDATE_SURPLUS = `
  WITH s AS (
    SELECT id, amount
    FROM ${TABLES.SURPLUS}
    ORDER BY id
    LIMIT 1
    FOR UPDATE
  )
  UPDATE ${TABLES.SURPLUS} AS su
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
  FROM ${TABLES.EXPENSES}
  WHERE id = $1
  FOR UPDATE
`;

export const UPDATE_SURPLUS_ON_DELETE = `
  WITH s AS (
    SELECT id
    FROM ${TABLES.SURPLUS}
    ORDER BY id
    LIMIT 1
    FOR UPDATE
  )
  UPDATE ${TABLES.SURPLUS} AS su
  SET amount = su.amount + LEAST(ABS($1), $2)
  FROM s
  WHERE su.id = s.id
`