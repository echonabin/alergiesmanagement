import { createUser, loginUser, refreshToken } from '../dao/user-dao';
import { IUser } from '../types';
import { hash } from '../utils/auth-utils';

type LoginProps = {
  email: string;
  password: string;
};

export const createUserService = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  const { firstName, lastName, email, password } = data;

  const finalData = {
    first_name: firstName,
    last_name: lastName,
    email,
    password: hash(password),
  } as IUser;

  const response = await createUser(finalData);

  return response;
};

export const loginUserService = async (data: LoginProps) => {
  const response = await loginUser(data);
  return response;
};

export const refreshTokenService = async (data: { token: string }) => {
  const response = await refreshToken(data.token);
  // FIXME: Return response data
  return response;
};
