import { Dispatch } from 'redux';
import {
  createAllergy,
  deleteAllergy,
  updateAllergy,
  getAllergies,
  getSingleAllergy,
} from '@alergiesmanagement/utils';

import {
  UPDATE_ALLERGY,
  GET_ALLERGIES,
  GET_SINGLE_ALLERGY,
  CREATE_ALLERGY,
  DELETE_ALLERGY,
  SET_LOADING,
  ALLERGY_ERR,
} from '../../types';

interface IAllergy {
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

export const createAllergyAction =
  (data: IAllergy) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: SET_LOADING,
      });
      const res = await createAllergy(data);
      dispatch({
        type: CREATE_ALLERGY,
        payload: res.data,
      });
    } catch (err: any) {
      dispatch({
        type: ALLERGY_ERR,
        payload: err.response.data.errors[0],
      });
    }
  };

export const getAllergiesAction =
  ({ page = 0, limit = 10 }: { page?: number; limit?: number }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: SET_LOADING,
      });
      const res = await getAllergies(page, limit);
      dispatch({
        type: GET_ALLERGIES,
        payload: res.data,
      });
    } catch (err: any) {
      dispatch({
        type: ALLERGY_ERR,
        payload: err.response.data.errors[0],
      });
    }
  };

export const getSingleAllergyAction =
  (id: string | number) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: SET_LOADING,
      });
      const res = await getSingleAllergy(id);
      dispatch({
        type: GET_SINGLE_ALLERGY,
        payload: res.data,
      });
    } catch (err: any) {
      dispatch({
        type: ALLERGY_ERR,
        payload: err.response.data.errors[0],
      });
    }
  };

export const updateAllergyAction =
  (id: string | number, data: IUpdateAllergy) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: SET_LOADING,
      });
      const res = await updateAllergy(id, data);
      dispatch({
        type: UPDATE_ALLERGY,
        payload: res.data,
      });
    } catch (err: any) {
      dispatch({
        type: ALLERGY_ERR,
        payload: err.response.data.errors[0],
      });
    }
  };

export const deleteAllergyAction =
  (id: string | number) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: SET_LOADING,
      });
      const res = await deleteAllergy(id);
      dispatch({
        type: DELETE_ALLERGY,
        payload: res.data,
      });
    } catch (err: any) {
      dispatch({
        type: ALLERGY_ERR,
        payload: err.response.data.errors[0],
      });
    }
  };
