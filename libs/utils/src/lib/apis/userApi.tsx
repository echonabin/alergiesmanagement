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

interface ILoginReturn {
  response: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    profile_url: string;
    jwtToken: string;
    refreshToken: {
      token: string;
      expires: string;
      is_active: boolean;
    };
  };
}

export const loginUser = async (data: ILoginUser) => {
  console.log('been here');

  await publicAgent.post<any>('/aserer/seees', data);
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
