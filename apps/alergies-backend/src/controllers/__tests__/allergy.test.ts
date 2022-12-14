import { retriveData, submitData } from '../../utils/test-utils';
import { API_ENDPOINTS } from '@alergiesmanagement/constants';

const { allergies } = API_ENDPOINTS;
const { create, get, getOne, hardDelete, restore, update } = allergies;

describe(`Allergy  testing....`, () => {
  test('Add Alergy should respond with a 201 status code', async () => {
    const token = await global.signin();
    const response = await submitData(
      {
        name: 'Test',
        symptoms: 'Lower abdomen pain',
        treatments: 'Injection of lactose free',
        notes: 'Please add carefully',
        severity: 'Urgent',
        allergyImage: 'https://google.com',
      },
      create,
      token
    );
    expect(response.statusCode).toBe(201);
  });
  //   test('Get allergies should respond with a 200 status code', async () => {
  //     const token = await global.signin();
  //     const createResp = await submitData(
  //       {
  //         name: 'Test',
  //         symptoms: 'Lower abdomen pain',
  //         treatments: 'Injection of lactose free',
  //         notes: 'Please add carefully',
  //         severity: 'Urgent',
  //         allergyImage: 'https://google.com',
  //       },
  //       create,
  //       token
  //     );
  //     expect(createResp.statusCode).toBe(201);
  //     const getResponse = await retriveData(get, token);
  //     expect(getResponse.statusCode).toBe(200);
  //   });
  //   test('Get single allergy should respond with a 200 status code', async () => {
  //     const token = await global.signin();
  //     const createResp = await submitData(
  //       {
  //         name: 'Test',
  //         symptoms: 'Lower abdomen pain',
  //         treatments: 'Injection of lactose free',
  //         notes: 'Please add carefully',
  //         severity: 'Urgent',
  //         allergyImage: 'https://google.com',
  //       },
  //       create,
  //       token
  //     );
  //     expect(createResp.statusCode).toBe(201);
  //     const getResponse = await retriveData(`/allergy/1`);
  //     expect(getResponse.statusCode).toBe(200);
  //   });
});
