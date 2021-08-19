import { CREATE_USER } from "./userActions";

const initialState = {
    message: "",
    error:false
}

const userReducer = ( state = initialState, action) => {
    switch (action.type) {
        case CREATE_USER:
            return {
                ...state,
                message:action.message,
                error:action.error
            }
    
        default:
            return {}
    }
}

export default userReducer