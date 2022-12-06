import { expressjwt as jwt } from 'express-jwt';
import { Request, Response, NextFunction } from 'express';

import db from '../db';
import { IRefreshToken, IUser } from '../types';

// const shouldMockReturn = process.env.NODE_ENV === "test";
interface UserExtended extends IUser {
  ownsToken: (token: string) => void;
}

interface IExtendedRequest extends Request {
  auth: {
    account: UserExtended;
  };
}

export const authorize = () => {
  const usersModel = db<IUser>('users');
  const refreshTokenModel = db<IRefreshToken>('refreshtokens');
  return [
    // authenticate JWT token and attach user to request object (req.auth)
    jwt({ secret: process.env.NX_JWT_SECRET, algorithms: ['HS256'] }),
    async (req: IExtendedRequest, res: Response, next: NextFunction) => {
      const user = req.auth.account;
      const account = await usersModel
        .select('*')
        .where('user_id', user.user_id);
      const refreshTokens = await refreshTokenModel
        .select('*')
        .where('user_id', user.user_id);

      if (!account) {
        // account no longer exists or role not authorized
        return res.status(401).json({ message: 'Unauthorized', status: 401 });
      }

      //   authentication and authorization successful
      user.ownsToken = (token: string) =>
        !!refreshTokens.find((x: any) => x.token === token);
      next();
    },
  ];
};
