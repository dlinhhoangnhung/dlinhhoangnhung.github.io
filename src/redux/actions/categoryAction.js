import axios from 'axios'
import userService from '../../components/services/user.service'
import * as actionsType from '../constant/categoryConstants'

export const getCategories = () => async (dispatch) => {
    console.log('object')
    try {
        console.log('get cat: ')
        dispatch({ type: actionsType.GET_CATEGORIES_REQUEST })

        const { data } = await axios.get(`http://localhost:5001/users/api/categories`)

        dispatch({
            type: actionsType.GET_CATEGORIES_SUCCESS,
            payload: data
        })
    } catch (error) {
        console.log('error')
        dispatch({
            type: actionsType.GET_CATEGORIES_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
        })
    }
}