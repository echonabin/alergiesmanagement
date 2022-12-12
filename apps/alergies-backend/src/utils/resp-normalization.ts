import { NextFunction, Response } from 'express';

export const apiResponse = (
  response: any,
  res: Response,
  next: NextFunction
) => {
  if (response instanceof Error) {
    return next(response);
  }
  res.status(200).json({ response });
};
