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

export const getOrdersReducer = (state = { order: [] }, action) => {
    switch (action.type) {
        case actionsType.GET_ORDERS_REQUEST:
            return {
                loading: true,
                orders: []
            }
        case actionsType.GET_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }
        case actionsType.GET_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const getOrderReducer = (state = { order: [] }, action) => {
    switch (action.type) {
        case actionsType.GET_ORDER_REQUEST:
            return {
                loading: true,
                order: []
            }
        case actionsType.GET_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }
        case actionsType.GET_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}