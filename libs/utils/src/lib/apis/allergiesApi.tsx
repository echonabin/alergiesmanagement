import { privateAgent } from './requests';
import { API_ENDPOINTS } from '@alergiesmanagement/constants';

const { create, get } = API_ENDPOINTS.allergies;

interface ICreateAllergy {
  name: string;
  symptoms: string;
  treatments: string;
  notes: string;
  severity: string;
}

interface IUpdateAllergy {
  symptoms?: string;
  treatments?: string;
  notes?: string;
  severity?: string;
}

export const getAllergies = async (page?: number, limit?: number) => {
  const response = await privateAgent.get(get, { params: { page, limit } });
  return response;
};

export const getSingleAllergy = async (id: number | string) => {
  const get_single_route = `/allergy/${id}`;
  const response = await privateAgent.get(get_single_route);
  return response;
};

export const updateAllergy = async (
  id: number | string,
  data: IUpdateAllergy
) => {
  const update_allergy_route = `/allergy/${id}`;
  const response = await privateAgent.put(update_allergy_route, data);
  return response;
};

export const deleteAllergy = async (id: number | string) => {
  const delete_allergy_route = `/allergy/${id}`;
  const response = await privateAgent.delete(delete_allergy_route);
  return response;
};

export const restoreAllergy = async (id: number | string) => {
  const restore_allergy_route = `/allergy/restore-allergy/${id}`;
  const response = await privateAgent.put(restore_allergy_route);
  return response;
};

export const createAllergy = async (data: ICreateAllergy) => {
  const response = await privateAgent.post(create, data);
  return response;
};
