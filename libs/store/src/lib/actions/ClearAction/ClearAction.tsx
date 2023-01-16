import { Dispatch } from 'redux';

import { CLEAR_MESSAGE } from '../../types';

export const clearAlert = () => async (dispatch: Dispatch) => {
  dispatch({
    type: CLEAR_MESSAGE,
  });
};
