import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import listReducer from './reducers/listReducer';

const rootReducer = combineReducers({
  users: userReducer,
  lists: listReducer,
});

export default rootReducer;
