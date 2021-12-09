import * as actionTypes from '../constant/userContants'

const USER_INITIAL_STATE = {
    userInfo: localStorage.getItem('userInfo'),
}

export const getUserSigninReducer = (state = USER_INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.USER_SIGNIN_REQUEST:
            return { 
                loading: true 
            }
        case actionTypes.USER_SIGNIN_SUCCESS:
            return { 
                loading: false, 
                // ...state,
                userInfo: action.payload 
            }
        case actionTypes.USER_SIGNIN_FAIL:
            return { 
                loading: false, 
                error: action.payload 
            }
        case actionTypes.USER_SIGNOUT:
            return {}
        default:
            return state
    }
}

export const getOrderUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_ORDERITEM_REQUEST:
            return { loading: true };
        case actionTypes.UPDATE_ORDERITEM_REQUEST_SUCCESS:
            return { loading: false, success: true, order: action.payload };
        case actionTypes.UPDATE_ORDERITEM_REQUEST_FAIL:
            return { loading: false, error: action.payload };
        case actionTypes.UPDATE_ORDERITEM_RESET:
            return {};
        default:
            return state;
    }
}