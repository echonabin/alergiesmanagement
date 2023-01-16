import { submitData } from '../../utils/test-utils';
import { API_ENDPOINTS } from '@alergiesmanagement/constants';

const { allergies, base_url } = API_ENDPOINTS;
const { create } = allergies;

export const createAllergy = async (data?: any) => {
  const body = data || {
    name: 'Test',
    symptoms: 'Lower abdomen pain',
    treatments: 'Injection of lactose free',
    notes: 'Please add carefully',
    severity: 'Urgent',
    allergyImage: 'https://google.com',
  };
  const token = await global.signin();
  const createResp = await submitData(body, create, token);
  return createResp;
};

describe(`Create Allergy testing...`, () => {
  test(`Add Alergy should respond with a 201 status code ${
    base_url + create
  }`, async () => {
    const response = await createAllergy();
    expect(response.statusCode).toBe(201);
  });

  test(`Add allergy should respond with a 400 status code ${
    base_url + create
  }`, async () => {
    const response = await createAllergy({
      name: 'Something',
      treatments: 'Injection of lactose free',
      notes: 'Please add carefully',
      severity: 'Urgent',
      allergyImage: 'https://google.com',
    });
    expect(response.statusCode).toBe(400);
  });

  test(`Add allergy should respond with a 400 status code ${
    base_url + create
  }`, async () => {
    await createAllergy();
    const response = await createAllergy();
    expect(response.statusCode).toBe(400);
  });
});
