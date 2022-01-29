import axios from 'axios'
import * as actionTypes from '../constant/orderConstants'
import authService from '../../components/services/auth.service'
import { CART_EMPTY } from '../constant/cartConstants'
import authHeader from '../../components/services/auth-header'
import history from '../../history'

export const createOrder = (order) => async (dispatch, getState) => {

    dispatch({ type: actionTypes.ORDER_CREATE_REQUEST, payload: order })
    try {
        const { data } = await axios.post('http://localhost:5001/users/api/orders', order,
            { headers: authHeader() }
        ) //cart nó ở đâu cưng 
        console.log(' sxz ' + data._id)
        dispatch({ type: actionTypes.ORDER_CREATE_SUCCESS, payload: data })
        // localStorage.setItem('orderId', JSON.stringify(data.order._id))
        history.push(`/user-view/order-${data._id}`);

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

export const getOrderByUser = (id) => async (dispatch, getState) => {
    try {
        console.log('object')
        dispatch({ type: actionTypes.GET_ORDERS_REQUEST })
        const { data } = await axios.get('http://localhost:5001/users/api/orders/user/' + id, { headers: authHeader() })
        console.log('data ' + data)

        dispatch({
            type: actionTypes.GET_ORDERS_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: actionTypes.GET_ORDERS_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        })
    }
}

export const getOrder = (id) => async (dispatch, getState) => {
    try {
        console.log('id ' + id)
        dispatch({ type: actionTypes.GET_ORDER_REQUEST })
        const { data } = await axios.get('http://localhost:5001/users/api/orders/' + id, { headers: authHeader() })
        console.log('data ' + data)

        dispatch({
            type: actionTypes.GET_ORDER_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: actionTypes.GET_ORDER_FAIL,
            payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
        })
    }
}