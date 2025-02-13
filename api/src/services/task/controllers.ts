import { Router } from 'express';
import { TaskService } from './service';

const router = Router();

const path = '/task';
const pathWithId = `${path}/:id`;

router.post(path, async (req, res) => {
  const result = await new TaskService().create(req.body);
  res.status(201).json(result);
});

router.get(pathWithId, async (req, res) => {
  const result = await new TaskService().get(req.params.id);
  res.status(200).json(result);
});

router.get(path, async (req, res) => {
  const result = await new TaskService().find();
  res.status(200).json(result);
});

router.patch(pathWithId, async (req, res) => {
  const result = await new TaskService().patch(req.params.id, req.body);
  res.status(200).json(result);
});

router.delete(pathWithId, async (req, res) => {
  const result = await new TaskService().delete(req.params.id);
  res.status(200).json(result);
});

export { router as taskRouter };
