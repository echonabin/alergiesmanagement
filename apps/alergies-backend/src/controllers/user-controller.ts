import { NextFunction, Request, Response } from 'express';
import { DatabaseValidationErr } from '../errors/database-validation-error';
import { RequestValidationError } from '../errors/request-validation-error';
import {
  createUserService,
  loginUserService,
  refreshTokenService,
} from '../services/user-service';
import { AuthValidator } from '../validators/user-validator';

interface ExtendedReq extends Request {
  files: { location: string }[];
}

export const createUserController = async (
  req: ExtendedReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const files = req.files ?? [];
    const { error } = AuthValidator.register_user(req.body);
    if (error) {
      throw next(new RequestValidationError(error));
    }
    const finalData = {
      profileUrl: files.length > 0 ? req.files[0].location : null,
      ...req.body,
    };
    const response = await createUserService(finalData);
    res
      .status(201)
      .json({ response, status: 201, message: 'User created successfully!' });
  } catch (error) {
    next(error);
  }
};

export const loginUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = AuthValidator.login_user(req.body);
    // FIXME: Add Error logic with middleware later
    if (error) {
      throw next(new RequestValidationError(error));
    }
    const response = await loginUserService(req.body);
    res.status(200).json({ message: 'Login Success', status: 200, response });
  } catch (error) {
    next(error);
  }
};

export const refreshTokenController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.query;
    if (!token) {
      throw new DatabaseValidationErr({
        reason: 'Token is required',
        statusCode: 400,
      });
    }
    const data = {
      token: token.toString(),
    };
    const response = await refreshTokenService(data);
    res.status(200).json({ response });
  } catch (error) {
    next(error);
  }
};
