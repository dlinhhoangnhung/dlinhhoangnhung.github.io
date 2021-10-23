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
            const existItem = state.cartItems.find((p) => p.product === item.product)

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) => x.product === existItem.product ? (
                        {
                            ...x,
                            qty: Number(x.qty) + Number(item.qty)

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
                cartItems: state.cartItems.filter((x) => x.product !== action.payload)
            }
        case actionTypes.INCREASE_QTY2:
            return {
                ...state,
                cartItems: state.cartItems
            };
        case actionTypes.DECREASE_QTY2:
            return {
                ...state,
                cartItems: state.cartItems
            };


        case actionTypes.INCREASE_QTY:
            return {
                ...state,
                cartItems: state.cartItems.map(i =>
                    i.product === action.payload.product ?
                        {
                            ...i,
                            qty: i.qty + 1
                        }
                        : i
                )
            }

        // return {
        //     ...state,
        //     cartItems: incResults

        // }
        case actionTypes.DECREASE_QTY:
            return {
                ...state,
                cartItems: state.cartItems.map(i =>
                    i.product === action.payload.product ?
                        {
                            ...i,
                            qty: i.qty === 1 ? i.qty = 1 : i.qty - 1
                        }
                        : i
                )
            }
        // case actionTypes.INCREASE_QUANTITY:
        //     state.numberCart++
        //     state.Carts[action.payload].quantity++;

        //     return {
        //         ...state
        //     }
        // case actionTypes.DECREASE_QUANTITY:
        //     let quantity = state.Carts[action.payload].quantity;
        //     if (quantity > 1) {
        //         state.numberCart--;
        //         state.Carts[action.payload].quantity--;
        //     }

        //     return {
        //         ...state
        //     }


        case actionTypes.INCREASE:
            // let addedItem = state.cartItems.find(item => item.product === action.payload.product)
            // addedItem.qty += 1
            // let newTotal = state.total + addedItem.price
            return {
                ...state,
                cartItems: state.cartItems.map(i => i.product === action.payload.product ? {
                    ...i,
                    qty: action.payload.qty + 1
                } : i)
                // total: newTotal
            }

        case actionTypes.DECREASE:
            return {
                ...state,
                cartItems: state.cartItems.map(i => i.product === action.payload.product ? {
                    ...i,
                    qty: action.payload.qty - 1
                } : i)
                // let a = state.items.find(item => item.id === action.id)
                //if the qt == 0 then it should be removed
                // if (addedItem.quantity === 1) {
                //     let new_items = state.addedItems.filter(item => item.id !== action.id)
                //     let newTotal = state.total - addedItem.price
                //     return {
                //         ...state,
                //         addedItems: new_items,
                //         total: newTotal
                //     }
                // }
                // else {
                //     addedItem.quantity -= 1
                //     let newTotal = state.total - addedItem.price
                //     return {
                //         ...state,
                //         total: newTotal
                //     }
                // }


                // let decResults = state.cartItems.map(i => {
                //     if (i.product === action.payload.product) {
                //         i = { ...i, qty: i.qty === 1 ? i.qty = 1 : i.qty - 1 }
                //     }
                //     return i;
                // })

                // return {
                //     ...state,
                //     cartItems: decResults

                // }



                // case actionTypes.INCREASE_QTY:
                //     let updatedCart = state.cartItems.map((x)=>{ x.id === item.id ? 
                //     })
                //     if (item.id === action.id) {
                //         item.qty += action.up;
                //     }
                //     return item;

                // case actionTypes.DECREASE_QTY:

                //     if (item.id === action.id) {
                //         item.quantity -= action.down;
                //     }
                //     return item;
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