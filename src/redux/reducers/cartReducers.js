import { xorBy } from "lodash"
import * as actionTypes from "../constant/cartConstants"

const CART_INITIAL_STATE = {
    cartItems: [],
    // qty: 0,
    // total: 0,
    // delivery: 5,
}
export const cartReducer = (state = CART_INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            const item = action.payload
            const existItem = state.cartItems.find((p) => p.mix === item.mix)

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) => x.mix === existItem.mix ? (
                        {
                            ...x,
                            qty: Number(x.qty) + Number(item.qty),
                            color: x.textColor,
                            size: x.textSize,
                            mix: x.mix
                            // ...item,
                            // qty: x.qty += Number(existItem.qty)
                            // qty: item.qty,
                        }
                        // item
                    ) : x), // thì map them item khong thi map x

                }
            }
            else { // chua co item
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }

        case actionTypes.ADJUST_QTY:
            return {
                ...state,
                cartItems: state.cartItems.map(x => x.product === action.payload.product ? {
                    ...x,
                    qty: action.payload.qty
                } : x)
            }

        case actionTypes.REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x.mix !== action.payload)
            }

        case actionTypes.INCREASE:
            // let addedItem = state.cartItems.find(item => item.product === action.payload.product)
            // addedItem.qty += 1
            // let newTotal = state.total + addedItem.price
            return {
                ...state,
                cartItems: state.cartItems.map(i => i.mix === action.payload.mix ? {
                    ...i,
                    qty: action.payload.qty + 1
                } : i)
                // total: newTotal
            }

        case actionTypes.DECREASE:
            return {
                ...state,
                cartItems: state.cartItems.map(i => i.mix === action.payload.mix ? {
                    ...i,
                    qty: action.payload.qty - 1
                } : i)
            }
        case actionTypes.CART_SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload
            }
        case actionTypes.CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }
        case actionTypes.CART_EMPTY:
            return {
                ...state,
                cartItems: []
            }
        default:
            return state;
    }
}