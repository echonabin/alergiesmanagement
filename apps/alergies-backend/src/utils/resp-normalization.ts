import { NextFunction, Response } from 'express';

export const apiResponse = (data: {
  response: any;
  res: Response;
  next: NextFunction;
  statusCode?: number;
  message?: string;
}) => {
  const { res, next, statusCode = 200, response, message = 'success' } = data;
  if (response instanceof Error) {
    return next(response);
  }
  res
    .status(statusCode)
    .json({ message: message, status: statusCode, response });
};
