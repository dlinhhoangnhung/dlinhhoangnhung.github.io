import * as actionTypes from "../constant/slideConstants"

export const getSlideReducer = (state = { index: [] }, action) => {
    switch (action.type) {

        case actionTypes.FIRST_VIEW:
            return {
                loading: false,
                index: action.payload
            }
        case actionTypes.SECOND_VIEW:
            return {
                loading: false,
                index: action.payload
            }
        case actionTypes.LAST_VIEW:
            return {
                loading: false,
                index: action.payload
            }
        default:
            return {
                index: 0
            };
    }
}