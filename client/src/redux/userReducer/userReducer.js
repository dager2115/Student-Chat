import { CREATE_USER, GET_ALL_USERS, GET_ONE_USERS } from "./userActions";

const initialState = {
    message: "",
    error:false,
    users: []
}

const userReducer = ( state = initialState, action) => {
    switch (action.type) {
        case CREATE_USER:
            return {
                ...state,
                message:action.message,
                error:action.error
            }

        case GET_ALL_USERS:
            return{
                ...state,
                users: [...action.users]
            }
        
        case GET_ONE_USERS:
            return{
                ...state,
                users: [...action.users]
            }
    
        default:
            return {}
    }
}

export default userReducer