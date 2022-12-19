import {
  GET_ALLERGIES,
  GET_SINGLE_ALLERGY,
  UPDATE_ALLERGY,
  CREATE_ALLERGY,
  CLEAR_MESSAGE,
  SET_LOADING,
  ALLERGY_ERR,
  DELETE_ALLERGY,
} from '../../types';

const initialState = {
  allergies: {} as { response: { items: [] } },
  singleAllergy: {},
  loading: false,
  message: '',
  error: {},
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
    case CREATE_ALLERGY: {
      const newData = [...state.allergies.response.items, payload.response[0]];
      return {
        ...state,
        allergies: {
          ...state.allergies,
          response: { ...state.allergies.response, items: newData },
        },
        message: payload.message,
        loading: false,
      };
    }
    case GET_ALLERGIES:
      return {
        ...state,
        allergies: payload.response,
        loading: false,
      };
    case GET_SINGLE_ALLERGY:
      return {
        ...state,
        singleAllergy: payload.response[0],
        loading: false,
      };
    case UPDATE_ALLERGY:
      return {
        ...state,
        singleAllergy: payload.response[0],
        message: payload.message,
        loading: false,
      };
    case DELETE_ALLERGY:
      return {
        ...state,
        message: payload.response,
        loading: false,
      };
    case ALLERGY_ERR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        message: '',
        error: {},
      };
    default:
      return state;
  }
};
