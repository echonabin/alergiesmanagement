import { Request, Response } from 'express';
import { CustomError } from '../errors/custom-error';

export const errorHandler = (err: Error, req: Request, res: Response) => {
  if (err instanceof CustomError) {
    console.log(err);
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).send({ errors: [{ message: err.message }] });
  }

  res.status(400).send({
    errors: [{ message: 'Something went wrong' }],
  });
};
