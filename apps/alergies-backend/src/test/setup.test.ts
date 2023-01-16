import db from '../db';
import { submitData } from '../utils/test-utils';
import { API_ENDPOINTS } from '@alergiesmanagement/constants';

const { auth } = API_ENDPOINTS;

declare global {
  interface Global {
    signin(): Promise<string>;
  }
}

beforeEach(async () => {
  jest.setTimeout(30000);
  await db.migrate.rollback();
  await db.migrate.latest();
});

afterEach(async () => {
  jest.setTimeout(30000);
  await db.migrate.rollback();
});

global.signin = async () => {
  const data = {
    firstName: 'Nabin',
    lastName: 'Thapa',
    email: 'echonabin@gmail.com',
    password: '@@Something1',
  };

  await submitData(data, auth.signup);
  expect(201);
  const signInData = {
    email: 'echonabin@gmail.com',
    password: '@@Something1',
  };
  const response = await submitData(signInData, auth.signin);
  const token = response.body.response.jwtToken;
  return token;
};
