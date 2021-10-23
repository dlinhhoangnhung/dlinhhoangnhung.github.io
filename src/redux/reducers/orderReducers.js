import * as actionsType from '../constant/orderConstants'

export const getOrderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case actionsType.ORDER_CREATE_REQUEST:
            return { loading: true };
        case actionsType.ORDER_CREATE_SUCCESS:
            return { loading: false, success: true, order: action.payload };
        case actionsType.ORDER_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case actionsType.ORDER_CREATE_RESET:
            return {};
        default:
            return state;
    }
}