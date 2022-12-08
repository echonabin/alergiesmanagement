import * as moment from 'moment';

import db from '../db/db';
import { IRefreshToken, IUser } from '../types';
import {
  basicDetails,
  compare,
  generateJwtToken,
  generateRefreshToken,
} from '../utils/auth-utils';

export const createUser = async (data: IUser) => {
  const userModel = db<IUser>('users');
  const { email, first_name, last_name, password, profile_url } = data;
  const user = await userModel.select('email').where('email', email);
  if (user) {
    return 'User already exists!!';
  }
  await userModel.insert({
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

export const refreshToken = async (token: string) => {
  const refreshTokenModel = db<IRefreshToken>('refresh_tokens');
  try {
    const prevToken = await refreshTokenModel
      .join('users', 'users.user_id', 'refresh_tokens.user_id')
      .select('*')
      .where('token', token)
      .first();

    if (
      !prevToken ||
      !prevToken.is_active ||
      moment(prevToken.expires).format() < moment(Date.now()).format()
    ) {
      return 'Invalid token provided!!';
    }

    const userAccount = {
      email: prevToken.email,
      first_name: prevToken.first_name,
      last_name: prevToken.last_name,
      user_id: prevToken.user_id,
      profile_url: prevToken.profile_url,
      created_at: prevToken.created_at,
      updated_at: prevToken.updated_at,
    } as IUser;

    const jwtToken = generateJwtToken(userAccount);
    return {
      ...basicDetails(userAccount),
      jwtToken,
    };
  } catch (error) {
    console.log(error);
    // FIXME: Add some error handling logic
    return 'Failure';
  }
};
