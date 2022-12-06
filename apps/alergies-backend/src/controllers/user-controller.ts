import { Request, Response } from 'express';
import { createUserService, loginUserService } from '../services/user-service';
import { compare } from '../utils/auth-utils';
import { AuthValidator } from '../validators/user-validator';

export const createUserController = async (req: Request, res: Response) => {
  try {
    const { error } = AuthValidator.register_user(req.body);
    // FIXME: Add Error logic with middleware later
    if (error) {
      return res.status(400).json({ error });
    }
    const response = await createUserService(req.body);
    res.status(200).json({ response });
  } catch (error) {
    console.log(error);
  }
};

export const loginUserController = async (req: Request, res: Response) => {
  try {
    const { error } = AuthValidator.login_user(req.body);
    // FIXME: Add Error logic with middleware later
    if (error) {
      return res.status(400).json({ error });
    }
    const response = await loginUserService(req.body);
    res.status(200).json({ response });
  } catch (error) {
    console.log(error);
  }
};
