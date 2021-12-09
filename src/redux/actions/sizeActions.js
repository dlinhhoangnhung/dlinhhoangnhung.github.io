import axios from 'axios'
import userService from '../../components/services/user.service'
import * as actionsType from '../constant/sizeConstants'

export const getSizes = () => async (dispatch) => {
    try {
        dispatch({ type: actionsType.GET_SIZES_REQUEST })

        const { data } = await axios.get(`http://localhost:5001/users/api/products-sizes`)
        console.log(data)

        dispatch({
            type: actionsType.GET_SIZES_SUCCESS,
            payload: data
        })
    } catch (error) {
        console.log('error')
        dispatch({
            type: actionsType.GET_SIZES_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
        })
    }
}