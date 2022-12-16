import { Dispatch } from 'redux';
import { loginUser, registerUser } from '@alergiesmanagement/utils';
import { AUTH_ERR, LOGIN_USER, LOGOUT_USER, SIGNUP_USER } from '../../types';

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

export const SignUpUser =
  (data: IRegisterUser) => async (dispatch: Dispatch) => {
    try {
      const res = await registerUser(data);
      dispatch({
        type: SIGNUP_USER,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: AUTH_ERR,
        payload: 'Error',
      });
    }
  };

export const LoginUser = (data: ILoginUser) => async (dispatch: Dispatch) => {
  try {
    const res = await loginUser(data);
    dispatch({
      type: LOGIN_USER,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: AUTH_ERR,
      // Change payload to server response
      payload: 'Error',
    });
  }
};

export const LogoutUser = () => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: LOGOUT_USER,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: AUTH_ERR,
      payload: 'Error',
    });
  }
};
