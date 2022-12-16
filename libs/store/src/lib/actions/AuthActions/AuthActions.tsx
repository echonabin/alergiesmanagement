import { Dispatch } from 'redux';
import {
  loginUser as LoginUser,
  registerUser,
} from '@alergiesmanagement/utils';
import {
  AUTH_ERR,
  LOGIN_USER,
  LOGOUT_USER,
  SIGNUP_USER,
  SET_LOADING,
} from '../../types';

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

export const signUpUser =
  (data: IRegisterUser) => async (dispatch: Dispatch) => {
    try {
      const res = await registerUser(data);
      dispatch({
        type: SIGNUP_USER,
        payload: res.data,
      });
    } catch (err: any) {
      dispatch({
        type: AUTH_ERR,
        payload: err.response.data.errors[0],
      });
    }
  };

export const loginUser = (data: ILoginUser) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: SET_LOADING,
    });
    const res = await LoginUser(data);
    dispatch({
      type: LOGIN_USER,
      payload: res.data,
    });
  } catch (err: any) {
    dispatch({
      type: AUTH_ERR,
      payload: err.response.data.errors[0],
    });
  }
};

export const logoutUser = () => async (dispatch: Dispatch) => {
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
