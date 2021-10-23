import * as actionsType from '../constant/userContants'
import Axios from 'axios';
// import history from '../../history';
import authHeader from '../../components/services/auth-header';

export const signin = (username, password) => async (dispatch) => {
    dispatch({ type: actionsType.USER_SIGNIN_REQUEST, payload: { username, password } })
    try {
        const { data } = await Axios.post('http://localhost:5001/users/sign-in', { username, password })
        dispatch({
            type: actionsType.USER_SIGNIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data));

        console.log("data: " + data)
        // LocalStorage save in AuthService-Login
        // localStorage.setItem('userInfo', JSON.stringify(data));
        // history.push('/');


    } catch (error) {
        dispatch({
            type: actionsType.USER_SIGNIN_FAIL,
            payload:
                error.response && error.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const signout = () => (dispatch, getState) => {
    dispatch({ type: actionsType.USER_SIGNOUT });

    localStorage.removeItem("userInfo", JSON.stringify(getState().getUserSignin.userInfo))

};

export const updateOrder = (order) => async (dispatch, getState) => {
    dispatch({ type: actionsType.UPDATE_ORDERITEM_REQUEST, payload: order })
    try {
        const { data } = await Axios.post('http://localhost:5001/users/', order,
            { headers: authHeader() }
        ) //cart nó ở đâu cưng 
        dispatch({ type: actionsType.UPDATE_ORDERITEM_REQUEST_SUCCESS, payload: data.order })
        console.log("dispatch worlk, order id: "+data.order)
    } catch (error) {
        console.log('err')
        dispatch({
            type: actionsType.UPDATE_ORDERITEM_REQUEST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}