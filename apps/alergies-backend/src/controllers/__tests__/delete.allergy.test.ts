import { deleteData } from '../../utils/test-utils';
import { API_ENDPOINTS } from '@alergiesmanagement/constants';
import { createAllergy } from './create.allergy.test';

const { allergies, base_url } = API_ENDPOINTS;

describe(`Delete allergy testing...`, () => {
  test(`Delete allergy should respond with 400 status code ${
    base_url + allergies.delete
  }`, async () => {
    const token = await global.signin();
    const delete_route = `/allergy/1`;
    const deleteResp = await deleteData(delete_route, token);
    expect(deleteResp.statusCode).toBe(400);
  });

  test(`Delete allergy should respond with 200 status code ${
    base_url + allergies.delete
  }`, async () => {
    const token = await global.signin();
    const createResp = await createAllergy();
    expect(createResp.statusCode).toBe(201);
    const delete_route = `/allergy/${createResp.body.response[0].id}`;
    const deleteResp = await deleteData(delete_route, token);
    expect(deleteResp.statusCode).toBe(200);
  });

  test(`Delete allergy should respond with 400 status code ${
    base_url + allergies.delete
  }`, async () => {
    const token = await global.signin();
    const delete_route = `/allergy/1`;
    const deleteResp = await deleteData(delete_route, token);
    expect(deleteResp.statusCode).toBe(400);
  });

  test(`Permanent Delete allergy should respond with 400 status code ${
    base_url + allergies.delete
  }`, async () => {
    const token = await global.signin();
    const delete_route = `/allergy/hard-delete/1`;
    const deleteResp = await deleteData(delete_route, token);
    expect(deleteResp.statusCode).toBe(400);
  });

  test(`Permanent Delete allergy should respond with 200 status code ${
    base_url + allergies.delete
  }`, async () => {
    const token = await global.signin();
    const createResp = await createAllergy();
    expect(createResp.statusCode).toBe(201);
    const delete_route = `/allergy/hard-delete/${createResp.body.response[0].id}`;
    const deleteResp = await deleteData(delete_route, token);
    expect(deleteResp.statusCode).toBe(200);
  });
});
