import * as actionTypes from "../constant/colorConstants"

export const getColorsReducer = (state = { color: [] }, action) => {
    switch (action.type) {
        case actionTypes.GET_COLORS_REQUEST:
            return {
                loading: true,
                colors: []
            }
        case actionTypes.GET_COLORS_SUCCESS:
            return {
                loading: false,
                colors: action.payload
            }
        case actionTypes.GET_COLORS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}