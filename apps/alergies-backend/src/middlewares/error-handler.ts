import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors/custom-error';
import db from '../db/db';
import { IDefaultTimeStamp } from '../types/global-types';

interface IError extends IDefaultTimeStamp {
  id: number;
  description: string;
  error_user: number;
}

interface ExtendedReqObj extends Request {
  auth: {
    account: {
      user_id: number;
    };
  };
}

export const errorHandler = async (
  err: Error,
  req: ExtendedReqObj,
  res: Response,
  next: NextFunction
) => {
  const errorModel = db<IError>('errorlogs');

  // const insertIntoDb = async () => {
  //   const { user_id } = req.auth.account;
  //   if (user_id) {
  //     await errorModel.insert({
  //       description: JSON.stringify(err),
  //       error_user: user_id,
  //     });
  //   }
  //   return;
  // };

  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).send({ errors: [{ message: err.message }] });
  }

  // await insertIntoDb();
  console.log(err);
  res.status(400).send({
    errors: [{ message: 'Something went wrong on the server!!' }],
  });
};
