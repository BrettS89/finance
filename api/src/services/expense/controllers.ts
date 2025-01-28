import { Router } from 'express';
import { ExpenseService } from './service';

const router = Router();

const path = '/expense';
const pathWithId = `${path}/:id`;

router.post(path, async (req, res) => {
  const result = await new ExpenseService().create(req.body);
  res.status(201).json(result);
});

router.get(pathWithId, async (req, res) => {
  const result = await new ExpenseService().get(req.params.id);
  res.status(200).json(result);
});

router.get(path, async (req, res) => {
  const result = await new ExpenseService().find();
  res.status(200).json(result);
});

router.patch(pathWithId, async (req, res) => {
  const result = await new ExpenseService().patch(req.params.id, req.body);
  res.status(200).json(result);
});

router.delete(pathWithId, async (req, res) => {
  const result = await new ExpenseService().delete(req.params.id);
  res.status(200).json(result);
});

export { router as expenseRouter };
