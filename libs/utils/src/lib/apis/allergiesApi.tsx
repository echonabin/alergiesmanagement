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

export const getAllergies = async () => {
  const response = await privateAgent.get(get);
  return response.data;
};

export const getSingleAllergy = async (id: number | string) => {
  const get_single_route = `/allergy/${id}`;
  const response = await privateAgent.get(get_single_route);
  return response.data;
};
