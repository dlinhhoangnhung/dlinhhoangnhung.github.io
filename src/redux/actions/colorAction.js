import axios from 'axios'
import userService from '../../components/services/user.service'
import * as actionsType from '../constant/colorConstants'

export const getColors = () => async (dispatch) => {
    try {
        dispatch({ type: actionsType.GET_COLORS_REQUEST })

        const { data } = await axios.get(`http://localhost:5001/users/api/products-colors`)
        console.log(data)

        dispatch({
            type: actionsType.GET_COLORS_SUCCESS,
            payload: data
        })
    } catch (error) {
        console.log('error')
        dispatch({
            type: actionsType.GET_COLORS_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
        })
    }
}