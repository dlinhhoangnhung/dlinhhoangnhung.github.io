import * as actionTypes from "../constant/cartConstants"
import axios from 'axios'

export const adjustQty = (id, qty) => async (dispatch, getState) => {
    dispatch({ // phan nay chuyen di cho cartReducer
        type: actionTypes.ADJUST_QTY,
        payload: {
            product: id,
            qty: qty
        },
    });


    localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems))
}

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`http://localhost:5001/users/api/products/${id}`);
    // khi user co action:them vao gio, get id cua san pham do

    dispatch({ // phan nay chuyen di cho cartReducer
        type: actionTypes.ADD_TO_CART,
        payload: {
            product: data._id,
            name: data.name,
            thumbnail: data.thumbnail,
            price: data.price,
            qty,
        },
    });


    localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: actionTypes.REMOVE_FROM_CART,
        payload: id
    })

    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems))
}

export function increaseItem(payload) {
    return {
        type: 'INCREASE',
        payload
    }
}
export function decreaseItem(payload) {
    return {
        type: 'DECREASE',
        payload
    }
}


// export const increaseItem = (id) => (dispatch, getState) => {
//     console.log(`increase :${id}`);
//     dispatch({
//         type: actionTypes.INCREASE_QTY,
//         payload: id
//     })
//     localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems))

// }

// export const decreaseItem = (id) => (dispatch, getState) => {
//     console.log(`DECREASE :${id}`);
//     dispatch({
//         type: actionTypes.DECREASE_QTY,
//         payload: id
//     })
//     localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems))

// }


export const increaseQty = (id, qty) => (dispatch, getState) => {
    console.log("ID: " + id + "qty: " + qty)

    dispatch({ // phan nay chuyen di cho cartReducer
        type: actionTypes.INCREASE,
        payload: {
            product: id,
            qty: qty
        },
    });
    // console.log(product)
    // const cartItems = getState().cart.cartItems.slice()
    // const selectProduct = cartItems.find(i => i.id === product.id)
    // const index = cartItems.indexOf(selectProduct)
    // const value = cartItems[index]
    // value.qty += 1
    // // value.total=value.qty*value.netPrice

    // dispatch({
    //     type: actionTypes.INCREASE_QTY2,
    //     payload: { cartItems }
    // })
    localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems))
}

export const decreaseQty = (id, qty) => (dispatch, getState) => {
    dispatch({ // phan nay chuyen di cho cartReducer
        type: actionTypes.DECREASE,
        payload: {
            product: id,
            qty: qty
        },
    });
    // const cartItems = getState().cart.cartItems.slice()
    // const selectProduct = getState().cart.cartItems.find(i => i.id === product.id)
    // const index = cartItems.indexOf(selectProduct)
    // const value = cartItems[index]
    // if (value.qty > 1) {
    //     value.qty = value.qty - 1
    //     // value.total = value.qty*value.netPrice
    // }


    // dispatch({
    //     type: actionTypes.DECREASE_QTY2,
    //     payload: { cartItems }
    // })
    localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({ type: actionTypes.CART_SAVE_SHIPPING_INFO, payload: data })
    localStorage.setItem('shippingInfo', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({ type: actionTypes.CART_SAVE_PAYMENT_METHOD, payload: data })
}
