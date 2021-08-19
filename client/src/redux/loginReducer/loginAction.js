import axios from "axios";

export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAIL = "USER_LOGIN_FAIL";



export const userLogin = (userName, password) => {
  return function (dispatch) {
    return axios.post('/auth/login', { userName, password })
      .then(res => {
          dispatch({ type: USER_LOGIN_SUCCESS, payload: {
            token: res.data,
          }})
          sessionStorage.setItem('data', res.data);
          window.location.replace('/home');
        })
      .catch(error => {
        dispatch({
          type: USER_LOGIN_FAIL,
          payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
      })
  }
}


