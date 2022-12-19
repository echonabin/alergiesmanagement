import { expressjwt as jwt } from 'express-jwt';

export const authorize = () => {
  return [
    // authenticate JWT token and attach user to request object (req.auth)
    jwt({ secret: process.env.NX_JWT_SECRET, algorithms: ['HS256'] }),
  ];
};
