import { combineReducers } from 'redux';

import CountReducer from './countReducer';

export default combineReducers({
    count: CountReducer,
  });