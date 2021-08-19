import { combineReducers } from 'redux';
import loginReducer from "./loginReducer/loginReducer";
import userReducer from './userReducer/userReducer';

const rootReducer = combineReducers({
  loginReducer,
  userReducer
});

export default rootReducer;
