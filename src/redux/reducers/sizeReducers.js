import * as actionTypes from "../constant/sizeConstants"

export const getSizesReducer = (state = { size: [] }, action) => {
    switch (action.type) {
        case actionTypes.GET_SIZES_REQUEST:
            return {
                loading: true,
                sizes: []
            }
        case actionTypes.GET_SIZES_SUCCESS:
            return {
                loading: false,
                sizes: action.payload
            }
        case actionTypes.GET_SIZES_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}