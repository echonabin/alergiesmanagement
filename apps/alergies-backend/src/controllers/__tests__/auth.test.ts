import { API_ENDPOINTS } from '@alergiesmanagement/constants';
import { retriveData, submitData } from '../../utils/test-utils';

const { base_url, auth } = API_ENDPOINTS;
const { signin, signup, refresh } = auth;

describe(`Initial route testing...`, () => {
  test('Should respond with 404', async () => {
    const response = await retriveData('/something_else');
    expect(response.statusCode).toBe(404);
  });
  test('Should respond with 200', async () => {
    const response = await retriveData('');
    expect(response.statusCode).toBe(200);
  });
});

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

  test(`Should return 400 without token ${base_url + refresh}`, async () => {
    const response = await retriveData('/auth/refresh-token');
    expect(response.statusCode).toBe(400);
  });

  test(`Should return 200 with token ${base_url + refresh}`, async () => {
    const signup_response = await submitData(
      {
        firstName: 'Nabin',
        lastName: 'Thapa',
        email: 'echonabin@gmail.com',
        password: '@@Something1',
        profileUrl: 'http://unsplash.com/eefd',
      },
      signup
    );
    expect(signup_response.statusCode).toBe(201);
    const login_response = await submitData(
      { email: 'echonabin@gmail.com', password: '@@Something1' },
      signin
    );
    expect(login_response.statusCode).toBe(200);
    const refresh_route = `${refresh}?token=${login_response.body.response.refreshToken.token}`;
    const response = await retriveData(refresh_route);
    expect(response.statusCode).toBe(200);
  });
});
