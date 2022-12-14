import { execSync } from 'child_process';
import { submitData } from '../utils/test-utils';
import { API_ENDPOINTS } from '@alergiesmanagement/constants';
const { auth } = API_ENDPOINTS;
import db from '../db';

declare global {
  interface Global {
    signin(): Promise<string>;
  }
}

let migrated = 0;

beforeEach(async () => {
  if (!migrated) {
    await db.migrate.latest();
    migrated = 1;
    console.log('Migrated...');
  }
});

afterEach(async () => {
  if (migrated) {
    await db.migrate.rollback();
    migrated = 0;
    console.log('Migration undo..');
  }
});

global.signin = async () => {
  const data = {
    firstName: 'Nabin',
    lastName: 'Thapa',
    email: 'echonabin@gmail.com',
    password: '@@Something1',
    profileUrl: 'http://unsplash.com/eefd',
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
