import { Router } from 'express';
import { ExpenseTypeService } from './service';

const router = Router();

router.post('/expense-type', async (req, res) => {
  const result = await new ExpenseTypeService().create(req.body);
  res.status(201).json(result);
});

router.get('/expense-type/:id', async (req, res) => {
  const result = await new ExpenseTypeService().get(req.params.id);
  res.status(200).json(result);
});

router.get('/expense-type', async (req, res) => {
  const result = await new ExpenseTypeService().find();
  res.status(200).json(result);
});

router.patch('/expense-type/:id', async (req, res) => {
  const result = await new ExpenseTypeService().patch(req.params.id, req.body);
});

router.delete('/expense-type/:id', async (req, res) => {
  const result = await new ExpenseTypeService().delete(req.params.id);
  res.status(200).json(result);
});

export { router as expenseTypeRouter };
