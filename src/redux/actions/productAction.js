import * as actionsType from "../constant/productConstants"
import axios from 'axios'

export const getProducts = () => async (dispatch) => {
    try {
        console.log('getPRoduct: ')
        dispatch({ type: actionsType.GET_PRODUCTS_REQUEST })

        const { data } = await axios.get(`http://localhost:5001/users/api/products`)

        dispatch({
            type: actionsType.GET_PRODUCTS_SUCCESS,
            payload: data
        })
    } catch (error) {
        console.log('error')
        dispatch({
            type: actionsType.GET_PRODUCTS_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
        })
    }
}

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: actionsType.GET_PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`http://localhost:5001/users/api/products/${id}`)
        console.log('product details'+data)
        dispatch({
            type: actionsType.GET_PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: actionsType.GET_PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
        })
    }
}

export const removeProductDetails = () => (dispatch) => {
    dispatch({
        type: actionsType.GET_PRODUCT_DETAILS_RESET
    })
} 