import { LOGIN_USER, LOGOUT_USER, AUTH_ERR, CLEAR_MESSAGE } from '../../types';
import { setCookie, deleteCookie } from 'cookies-next';

const initialState = {
  message: '',
  error: '',
  user: '',
};

export default (
  state = initialState,
  { type, payload }: { type: string; payload: any }
) => {
  switch (type) {
    case LOGIN_USER:
      setCookie('accessToken', payload.response.jwtToken);
      setCookie('refreshToken', payload.response.refreshToken.token);
      setCookie('userProfile', payload.response.profileUrl);
      return {
        ...state,
        user: payload,
        msg: 'Logged In',
      };
    case AUTH_ERR:
      return { ...state, error: 'Error in Auth' };
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
        message: '',
        error: '',
      };
    default:
      return state;
  }
};
