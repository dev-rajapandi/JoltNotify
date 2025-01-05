import { Request, Response, NextFunction } from 'express';
import { ConflictError, ValidationError } from '../utils/errors';

export const errorHandler = (
  err: Error,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  const error = {
    success: false,
    name: err.name,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV !== 'production' && {
      stack: err.stack,
      //   originalErr: err,
    }),
  };
  // Handle validation errors
  if (err instanceof ValidationError) {
    return res
      .status(err.statusCode)
      .json({ ...error, errors: err.validationErrors });
  }

  if (err instanceof ConflictError) {
    return res.status(err.statusCode).json(error);
  }

  // Default to internal server error
  return res.status(500).json(error);
};
