import { Router } from 'express';
import { SurplusService } from './service';

const router = Router();

const path = '/surplus';
const pathWithId = `${path}/:id`;

router.post(path, async (req, res) => {
  const result = await new SurplusService().create(req.body);
  res.status(201).json(result);
});

router.get(pathWithId, async (req, res) => {
  const result = await new SurplusService().get(req.params.id);
  res.status(200).json(result);
});

router.get(path, async (req, res) => {
  const result = await new SurplusService().find();
  res.status(200).json(result);
});

router.patch(pathWithId, async (req, res) => {
  const result = await new SurplusService().patch(req.params.id, req.body);
  res.status(200).json(result);
});

router.delete(pathWithId, async (req, res) => {
  const result = await new SurplusService().delete(req.params.id);
  res.status(200).json(result);
});

export { router as surplusRouter };
