import * as request from 'supertest';
import { app } from '../app';
import { API_ENDPOINTS } from '@alergiesmanagement/constants';

const { base_url, auth } = API_ENDPOINTS;
const { signin, signup } = auth;

describe(`Post ${base_url + signin}`, () => {
  // test('Should respond with a 201 status code', async () => {
  //   const response = await request(app)
  //     .post(URL + signup)
  //     .send({
  //       firstName: 'Nabin',
  //       lastName: 'Thapa',
  //       email: 'echonabin@gmail.com',
  //       password: '@@Something1',
  //       profileUrl: 'http://unsplash.com/eefd',
  //     });
  //   expect(response.statusCode).toBe(400);
  // });
  test('Should respond with a 200 status code', async () => {
    const response = await request(app)
      .post(base_url + signin)
      .send({
        email: 'echonabin@gmail.com',
        password: '@@Something1',
      });
    expect(response.statusCode).toBe(200);
  });
});

// describe(`Post ${URL + signin}`, () => {
//   test('Should respond with 400 status code', async () => {
//     const response = await request(app)
//       .post(base_url + signin)
//       .send({
//         email: 'echonabin@gmail',
//         password: '@@Something',
//       });
//     expect(response.statusCode).toBe(400);
//   });
// });
