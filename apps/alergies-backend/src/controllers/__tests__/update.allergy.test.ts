import * as path from 'path';

import { submitWithFile, updateData } from '../../utils/test-utils';
import { API_ENDPOINTS } from '@alergiesmanagement/constants';
import { createAllergy } from './create.allergy.test';

const { allergies, base_url } = API_ENDPOINTS;
const { update } = allergies;

describe(`Update allergy testing...`, () => {
  test(`Update allergy should respond with 400 status code ${
    base_url + update
  }`, async () => {
    const token = await global.signin();
    const createResp = await createAllergy();
    expect(createResp.statusCode).toBe(201);
    const update_route = `/allergy/${createResp.body.response[0].id}`;
    const updateResponse = await updateData(
      {
        name: 'Testing',
      },
      update_route,
      token
    );
    expect(updateResponse.statusCode).toBe(400);
  });

  test(`Update allergy should respond with 400 status code ${
    base_url + update
  }`, async () => {
    const token = await global.signin();
    const update_route = `/allergy/1`;
    const updateResponse = await updateData(
      {
        allergyImage: 'https://unsplash.com/333',
      },
      update_route,
      token
    );
    expect(updateResponse.statusCode).toBe(400);
  });

  test(`Update allergy should respond with 200 status code ${
    base_url + update
  }`, async () => {
    const token = await global.signin();
    const image = path.resolve(__dirname, './assets/logo-image.png');
    const createResp = await createAllergy();
    expect(createResp.statusCode).toBe(201);
    const update_route = `/allergy/${createResp.body.response[0].id}`;
    const updateResponse = await submitWithFile(image, update_route, token);
    expect(updateResponse.statusCode).toBe(200);
  });
});
