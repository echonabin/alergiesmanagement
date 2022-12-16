import { Dispatch } from 'redux';

export const cleanUp = (dispatch: Dispatch, clearAlert: any) => {
  setTimeout(() => dispatch(clearAlert()), 3000);
};
