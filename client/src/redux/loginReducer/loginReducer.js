import decode from "jwt-decode";
import { USER_LOGIN_SUCCESS, USER_LOGIN_FAIL } from "./loginAction";


const initialState = {
  userInfo: localStorage.getItem("data") ? decode(localStorage.getItem("data")) : "",
  token: localStorage.getItem("data") ? localStorage.getItem("data") : "",
  loginFailed: false,
  error: "",
};

const loginReducer = (state = initialState, action) => {
 
  switch (action.type) {
    
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        userInfo: decode(action.payload.token),
        token: action.payload.token,
        loginFailed: false
      }

    case USER_LOGIN_FAIL:
      return{
        ...state,
        loginFailed: true,
        error: action.payload,
      }
    default:
      return {}
  }
};

export default loginReducer;
