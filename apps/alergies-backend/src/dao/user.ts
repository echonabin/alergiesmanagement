import db from '../db';
import { IUser } from '../types';
import {
  basicDetails,
  compare,
  generateJwtToken,
  generateRefreshToken,
} from '../utils/auth-utils';

export const createUser = async (data: IUser) => {
  const userModel = db<IUser>('users');
  const { email, first_name, last_name, password, profile_url } = data;
  const user = await userModel.select('email');
  if (user) {
    return 'User already exists!!';
  }
  await db<IUser>('users').insert({
    email,
    first_name,
    last_name,
    password,
    profile_url,
  });
  return 'User created successfully!!';
};

export const loginUser = async (data: { email: string; password: string }) => {
  const userModel = db<IUser>('users');
  const user = await userModel
    .select('*')
    .where('email', data.email)
    .returning('*')
    .first();

  const isValidPassword = user && compare(data.password, user.password);
  // FIXME: ADD Better error handler later
  if (!user && !isValidPassword) {
    return 'Email or password you provided is incorrect!';
  }
  const jwtToken = generateJwtToken(user);
  const refreshToken = await generateRefreshToken(user, db);
  const { token, expires, is_active } = refreshToken[0];
  return {
    ...basicDetails(user),
    jwtToken,
    refreshToken: {
      token,
      expires,
      is_active,
    },
  };
};
