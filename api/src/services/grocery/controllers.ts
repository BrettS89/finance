import { Router } from 'express';
import { GroceryService } from './service';

const router = Router();

const path = '/grocery';
const pathWithId = `${path}/:id`;

router.post(path, async (req, res) => {
  const result = await new GroceryService().create(req.body);
  res.status(201).json(result);
});

router.get(pathWithId, async (req, res) => {
  const result = await new GroceryService().get(req.params.id);
  res.status(200).json(result);
});

router.get(path, async (req, res) => {
  const result = await new GroceryService().find();
  res.status(200).json(result);
});

router.patch(pathWithId, async (req, res) => {
  const result = await new GroceryService().patch(req.params.id, req.body);
  res.status(200).json(result);
});

router.delete(pathWithId, async (req, res) => {
  const result = await new GroceryService().delete(req.params.id);
  res.status(200).json(result);
});

export { router as groceryRouter };
