import { publicAgent } from './requests';
import { API_ENDPOINTS } from '@alergiesmanagement/constants';
const { signin, signup, refresh } = API_ENDPOINTS.auth;

interface ILoginUser {
  email: string;
  password: string;
}

interface IRegisterUser {
  firstNam: string;
  lastName: string;
  email: string;
  password: string;
}

export const loginUser = async (data: ILoginUser) => {
  const response = await publicAgent.post(signin, data);
  return response.data;
};

export const registerUser = async (data: IRegisterUser) => {
  const response = await publicAgent.post(signup, data);
  return response.data;
};

export const refreshToken = async (token: string) => {
  const route = `${refresh}?token=${token}`;
  const response = await publicAgent.get(route);
  return response.data;
};
