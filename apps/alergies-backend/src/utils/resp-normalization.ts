import { NextFunction, Response } from 'express';

export const apiResponse = (data: {
  response: any;
  res: Response;
  next: NextFunction;
  statusCode: number;
}) => {
  const { res, next, statusCode, response } = data;
  if (response instanceof Error) {
    return next(response);
  }
  res
    .status(statusCode)
    .json({ message: 'success', status: statusCode, response });
};
