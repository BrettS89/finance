import { Router } from 'express';
import { BudgetService } from './service';

const router = Router();

const path = '/budget';
const pathWithId = `${path}/:id`;

router.post(path, async (req, res) => {
  const result = await new BudgetService().create(req.body);
  res.status(201).json(result);
});

router.get(pathWithId, async (req, res) => {
  const result = await new BudgetService().get(req.params.id);
  res.status(200).json(result);
});

router.get(path, async (req, res) => {
  const result = await new BudgetService().find();
  res.status(200).json(result);
});

router.patch(pathWithId, async (req, res) => {
  const result = await new BudgetService().patch(req.params.id, req.body);
  res.status(200).json(result);
});

router.delete(pathWithId, async (req, res) => {
  const result = await new BudgetService().delete(req.params.id);
  res.status(200).json(result);
});

export { router as budgetRouter };
