import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import * as moment from 'moment';

import { IUser, IDatabaseInstance, IRefreshToken } from '../types';

// // small functions
export const generateJwtToken = (account: IUser) => {
  // create a jwt token containing the account id that expires in 15 minutes
  return jwt.sign({ account }, process.env.NX_JWT_SECRET, {
    expiresIn: '10m',
  });
};

function randomTokenString() {
  return crypto.randomBytes(40).toString('hex');
}

export const generateRefreshToken = async (
  account: IUser,
  dbModel: IDatabaseInstance
) => {
  const current_model = dbModel<IRefreshToken>('refresh_tokens');
  // remove old refresh tokens
  await current_model
    .where('user_id', account.user_id)
    .where('is_active', true)
    .update({
      is_active: false,
    });

  // create a refresh token that expires in 7 days
  return await current_model
    .insert({
      user_id: account.user_id,
      token: randomTokenString(),
      expires: moment(new Date()).add(1, 'h').toISOString(),
      is_active: true,
    })
    .returning('*');
};

export const basicDetails = (account: IUser) => {
  return {
    id: account.user_id,
    firstname: account.first_name,
    lastname: account.last_name,
    email: account.email,
    profile_url: account.profile_url,
  };
};

// Hash password
export const hash = (password: string) => {
  return bcrypt.hashSync(password, 10);
};

// Compare password
export const compare = async (password: string, dbPassword) => {
  return await bcrypt.compare(password, dbPassword);
};
