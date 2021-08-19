import axios from 'axios'

export const CREATE_USER = "CREATE_USER"

export const createUser = ( userData ) => {
    return function (dispatch) {
        return axios.post('/users/create', userData)
        .then(response =>{
            dispatch(({
                type: CREATE_USER, 
                message: response.data.message, 
                error: false
            }))
            window.location.replace('/')
            alert(response.data.message)
        })
        .catch(error => {
            alert(error.response.data.message)
        })
    }
}