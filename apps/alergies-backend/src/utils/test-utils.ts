import * as request from 'supertest';

import { app } from '../app';
import { API_ENDPOINTS } from '@alergiesmanagement/constants';

const { base_url } = API_ENDPOINTS;

export const submitData = async (data, url: string, token?: string) => {
  const response = await request(app)
    .post(base_url + url)
    .set('Authorization', `Bearer ${token}`)
    .send(data);
  return response;
};

export const submitWithFile = async (image, url: string, token?: string) => {
  const response = await request(app)
    .put(base_url + url)
    .set('Authorization', `Bearer ${token}`)
    .attach('image', image);
  return response;
};

export const updateData = async (data, url: string, token?: string) => {
  const response = await request(app)
    .put(base_url + url)
    .set('Authorization', `Bearer ${token}`)
    .send(data);
  return response;
};

export const retriveData = async (url: string, token?: string) => {
  const response = await request(app)
    .get(base_url + url)
    .set('Authorization', `Bearer ${token}`);
  return response;
};

export const deleteData = async (url: string, token?: string) => {
  const response = await request(app)
    .delete(base_url + url)
    .set('Authorization', `Bearer ${token}`);
  return response;
};
