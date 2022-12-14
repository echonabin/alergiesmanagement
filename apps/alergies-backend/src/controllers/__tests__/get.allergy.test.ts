import { retriveData } from '../../utils/test-utils';
import { API_ENDPOINTS } from '@alergiesmanagement/constants';
import { createAllergy } from './create.allergy.test';
const { allergies, base_url } = API_ENDPOINTS;
const { get, getOne } = allergies;

describe(`Get allergy testing...`, () => {
  test(`Get allergies should respond with a 400 status code ${
    base_url + get
  }`, async () => {
    const token = await global.signin();
    const response = await retriveData(get, token);
    expect(response.statusCode).toBe(400);
  });

  test(`Get allergies should respond with a 200 status code ${
    base_url + get
  }`, async () => {
    const token = await global.signin();
    const createResp = await createAllergy();
    expect(createResp.statusCode).toBe(201);
    const get_allergies_route = `${get}?page=0&limit=10`;
    const getResponse = await retriveData(get_allergies_route, token);
    const response = await retriveData(get, token);
    expect(getResponse.statusCode).toBe(200);
    expect(response.statusCode).toBe(200);
  });

  test(`Get single allergy should respond with a 400 status code ${
    base_url + getOne
  }`, async () => {
    const token = await global.signin();
    const getResponse = await retriveData(`/allergy/1`, token);
    expect(getResponse.statusCode).toBe(400);
  });

  test(`Get single allergy should respond with a 200 status code ${
    base_url + getOne
  }`, async () => {
    const token = await global.signin();
    const createResp = await createAllergy();
    expect(createResp.statusCode).toBe(201);
    const getResponse = await retriveData(
      `/allergy/${createResp.body.response[0].id}`,
      token
    );
    expect(getResponse.statusCode).toBe(200);
  });

  test(`Unauthorize route should respond with a 401 status code ${
    base_url + getOne
  }`, async () => {
    const getResponse = await retriveData(`/allergy/1`);
    expect(getResponse.statusCode).toBe(401);
  });
});
