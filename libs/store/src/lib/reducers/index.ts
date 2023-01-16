import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import AllergyReducer from './AllergyReducer';

export default combineReducers({
  AuthReducer,
  AllergyReducer,
});
