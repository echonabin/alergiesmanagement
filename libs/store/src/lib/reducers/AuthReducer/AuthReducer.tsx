import {
  LOGIN_USER,
  LOGOUT_USER,
  AUTH_ERR,
  CLEAR_MESSAGE,
  SET_LOADING,
} from '../../types';
import { setCookie, deleteCookie } from 'cookies-next';

const initialState = {
  message: '',
  error: '',
  loading: false,
  user: '',
};

export default (
  state = initialState,
  { type, payload }: { type: string; payload: any }
) => {
  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_USER:
      setCookie('accessToken', payload.response.jwtToken);
      setCookie('refreshToken', payload.response.refreshToken.token);
      setCookie('userProfile', JSON.stringify(payload.response.profile_url));
      return {
        ...state,
        user: payload,
        message: 'Logged In',
        loading: false,
      };
    case AUTH_ERR:
      return { ...state, error: payload, loading: false };
    case LOGOUT_USER:
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
      deleteCookie('userProfile');
      return {
        ...state,
        msg: 'Logout user successfully.',
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        message: '',
        error: '',
      };
    default:
      return state;
  }
};
