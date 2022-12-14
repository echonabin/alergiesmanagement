import { API_ENDPOINTS } from '@alergiesmanagement/constants';
import { submitData } from '../../utils/test-utils';

const { base_url, auth } = API_ENDPOINTS;
const { signin, signup } = auth;

describe(`Auth testing....`, () => {
  test('Should respond with a 200 & 201 status code', async () => {
    const signupResponse = await submitData(
      {
        firstName: 'Nabin',
        lastName: 'Thapa',
        email: 'echonabin@gmail.com',
        password: '@@Something1',
        profileUrl: 'http://unsplash.com/eefd',
      },
      signup
    );
    const signinResponse = await submitData(
      { email: 'echonabin@gmail.com', password: '@@Something1' },
      signin
    );
    expect(signupResponse.statusCode).toBe(201);
    expect(signinResponse.statusCode).toBe(200);
  });
});

describe('Auth validation error case', () => {
  test(`Should return validation error ${base_url + signup}`, async () => {
    const response = await submitData(
      {
        lastName: 'Thapa',
        email: 'echonabin@gmailcom',
        password: '@@Something1',
        profileUrl: 'http://unsplash.com/eefd',
      },
      signup
    );
    expect(response.statusCode).toBe(400);
  });
  test(`Should return validation error 400 ${base_url + signin}`, async () => {
    const response = await submitData(
      {
        email: 'echonabin@gmailcom',
        password: '@312122',
      },
      signin
    );
    expect(response.statusCode).toBe(400);
  });
  test(`Should return invalid email or password 400 ${
    base_url + signin
  }`, async () => {
    const response = await submitData(
      {
        email: 'echonabin@gmail.com',
        password: '@@3121321',
      },
      signin
    );
    expect(response.statusCode).toBe(400);
  });
});
