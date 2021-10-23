import axios from 'axios'
import * as actionTypes from '../constant/orderConstants'
import authService from '../../components/services/auth.service'
import { CART_EMPTY } from '../constant/cartConstants'
import authHeader from '../../components/services/auth-header'

export const createOrder = (order) => async (dispatch, getState) => {
    dispatch({ type: actionTypes.ORDER_CREATE_REQUEST, payload: order })
    try {
        const { data } = await axios.post('http://localhost:5001/users/api/orders', order,
            { headers: authHeader() }
        ) //cart nó ở đâu cưng 
        dispatch({ type: actionTypes.ORDER_CREATE_SUCCESS, payload: data.order })
        localStorage.setItem('orderId', JSON.stringify(data.order._id))

        localStorage.removeItem('cartItems')
        dispatch({ type: CART_EMPTY })
    } catch (error) {
        console.log('err')
        dispatch({
            type: actionTypes.ORDER_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}