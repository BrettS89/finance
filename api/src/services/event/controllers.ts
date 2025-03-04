import { Router } from 'express';
import { EventService } from './service';

const router = Router();

const path = '/event';
const pathWithId = `${path}/:id`;

router.post(path, async (req, res) => {
  const result = await new EventService().create(req.body);
  res.status(201).json(result);
});

router.get(pathWithId, async (req, res) => {
  const result = await new EventService().get(req.params.id);
  res.status(200).json(result);
});

router.get(path, async (req, res) => {
  const result = await new EventService().find();
  res.status(200).json(result);
});

router.patch(pathWithId, async (req, res) => {
  const result = await new EventService().patch(req.params.id, req.body);
  res.status(200).json(result);
});

router.delete(pathWithId, async (req, res) => {
  const result = await new EventService().delete(req.params.id);
  res.status(200).json(result);
});

export { router as eventRouter };
