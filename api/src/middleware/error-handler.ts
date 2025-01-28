import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors';

export const errorHandler = (
  e: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (e instanceof CustomError) {
    res.status(e.statusCode).json({ message: e.message });
  } else if (e instanceof Error) {
    res.status(500).json({ message: e.message ?? 'An unknown error occurred' });
  } else {
    res.status(500).json({ message: 'An unknown error occurred' });
  }
};
