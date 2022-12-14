import { deleteData, updateData } from '../../utils/test-utils';
import { API_ENDPOINTS } from '@alergiesmanagement/constants';
import { createAllergy } from './create.allergy.test';

const { allergies, base_url } = API_ENDPOINTS;

describe(`Restore allergy testing....`, () => {
  test(`Restore allergy should respond with 400 status code ${
    base_url + allergies.restore
  }`, async () => {
    const token = await global.signin();
    const restore_route = `/allergy/restore-allergy/5`;
    const updateResp = await updateData(null, restore_route, token);
    expect(updateResp.statusCode).toBe(400);
  });

  test(`Restore allergy should respond with 200 status code ${
    base_url + allergies.restore
  }`, async () => {
    const token = await global.signin();
    const createResp = await createAllergy();
    expect(createResp.statusCode).toBe(201);
    const delete_route = `/allergy/${createResp.body.response[0].id}`;
    const deleteResp = await deleteData(delete_route, token);
    expect(deleteResp.statusCode).toBe(200);
    const restore_route = `/allergy/restore-allergy/${createResp.body.response[0].id}`;
    const restoreResp = await updateData(null, restore_route, token);
    expect(restoreResp.statusCode).toBe(200);
  });
});
