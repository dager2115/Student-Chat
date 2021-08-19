import axios from 'axios'
import Swal from 'sweetalert2'

const alert = ( message, icon, time ) => {
    Swal.fire({
        text: message,
        icon: icon,
        timer: time,
        showConfirmButton: false
    })
}

export const CREATE_USER = "CREATE_USER"
export const GET_ALL_USERS = "GET_ALL_USERS"
export const GET_ONE_USERS = "GET_ONE_USERS"

export const createUser = ( userData ) => {
    return function (dispatch) {
        return axios.post('/users/create', userData)
        .then(response =>{
            dispatch(({
                type: CREATE_USER, 
                message: response.data.message, 
                error: false
            }))
            alert(response.data.message, "success", 2000)
            setTimeout(()=>{window.location.replace('/')}, 2000)
        })
        .catch(error => {
            alert(error.response.data.message, "warning", 2000)
        })
    }
}

export const getAllUsers = () => {
    return function (dispatch) {
        return axios.get('/users')
        .then(response => {
            console.log(response.data)
            dispatch(({
                type: GET_ALL_USERS,
                users: response.data
            }))
        })
        .catch(error => {
            console.log(error)
        })
    }
}

export const getOneUser = ( params ) => {
    const { keyword, param } = params
    return function (dispatch) {
        return axios.get(`/users/getOneUser/${param}/${keyword}`)
        .then(response => {
            console.log(response.data.user)
            dispatch(({
                type: GET_ONE_USERS,
                users: response.data.user
            }))
        })
        .catch(error => {
            alert("el usuario no existe", "warning", 2000)
            return axios.get('/users')
            .then(response => {
                console.log(response.data)
                dispatch(({
                    type: GET_ALL_USERS,
                    users: response.data
                }))
            })
            .catch(error => {
                console.log(error)
            })
        })
    }
}