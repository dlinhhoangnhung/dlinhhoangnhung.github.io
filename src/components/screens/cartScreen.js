import CartItem from '../cart/CartItem';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from "react";

import { removeFromCart, adjustQty, increaseItem, decreaseItem, decreaseQty, increaseQty } from "../../redux/actions/cartActions"
import { browserHistory } from 'react-router'
import history from '../../history';
import authService from '../services/auth.service';
import Navbar from '../Navbar';

const CartScreen = () => {
    const user = authService.getCurrentUser()
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    useEffect(() => { }, []);

    const increament2 = (id, qty, textSize, textColor) => {
        dispatch(increaseQty(id, qty, textSize, textColor))
    }

    const decreament2 = (id, qty, textSize, textColor) => {
        console.log(qty)
        qty === 1 ? dispatch(removeFromCart(id, textSize, textColor)) :
            dispatch(decreaseQty(id, qty, textSize, textColor))
    }

    const qtyChangeHandler = (id, qty) => {
        dispatch(adjustQty(id, Number(qty)))
    }

    const removeHandler = (id, textSize, textColor) => {
        dispatch(removeFromCart(id, textSize, textColor))
        console.log('object')
    }

    const getCartCount = () => {
        return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0)
    }

    const getCartSubTotal = () => {
        return cartItems
            .reduce((price, item) => price + item.price * item.qty, 0)
    }

    const compare = () => {
        const a = '61a799d87628485d79cd3857đỏfreesize'
        const b = '6z1a799d87628485d79cd3857đenfreesize'
        if (a === b) {
            console.log('like')
        } else {
            console.log('dif')
        }
    }
    return (

        <div>
            <Navbar />

            <body class="bg-gray-100 h-screen pt-20">
                <div class="container mx-auto mt-10">
                    <div class="flex shadow-md my-10">
                        <div class="w-3/4 bg-white px-10 py-10">
                            <div class="flex justify-between border-b pb-8">
                                <h1 class="font-semibold text-2xl">Giỏ hàng</h1>
                                <h2 class="font-semibold text-2xl">{getCartCount()} Item{getCartCount() > 1 ? 's' :''}</h2>
                            </div>
                            <div class="flex mt-10 mb-5">
                                <h3 class="font-semibold text-gray-600 text-xs uppercase w-2/5">Chi tiết đơn hàng</h3>
                                <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">SL</h3>
                                <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Giá</h3>
                                <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Tổng</h3>
                            </div>
                            {
                                cartItems.length === 0 ? (
                                    <div>Giỏ hàng của bạn đang trống</div>
                                ) : (
                                    cartItems.map((item) => (
                                        <div class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">

                                            <div class="flex w-2/5">
                                                <div class="w-20">
                                                    <img class="h-12 w-14" src={`http://localhost:3000/assets/imgs/products/${item.thumbnail}`} alt="" />
                                                </div>
                                                <div class="flex flex-col justify-between ml-4 flex-grow">
                                                    <span onClick={() => { compare() }} class="font-bold text-sm">{item.name}</span>
                                                    <span class="text-red-500 text-xs">{item.textColor}</span>
                                                    <span class="text-red-500 text-xs">{item.textSize && item.textSize}</span>
                                                    <a onClick={() => removeHandler(item.product , item.textSize, item.textColor)} class="font-semibold hover:text-red-500 text-gray-500 text-xs">Remove</a>
                                                </div>
                                            </div>
                                            <div class="flex justify-center w-1/5">
                                                <svg onClick={() => decreament2(item.product, item.qty, item.textSize, item.textColor)} class="fill-current text-gray-600 w-3" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                                                </svg>

                                                <input class="mx-2 border text-center w-8" type="text" value={item.qty} />

                                                <svg onClick={() => increament2(item.product, item.qty, item.textSize, item.textColor)} class="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                                                    <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                                                </svg>
                                            </div>
                                            <span class="text-center w-1/5 font-semibold text-sm">{item.price}</span>
                                            <span class="text-center w-1/5 font-semibold text-sm">{item.price*item.qty}</span>
                                        </div>
                                    ))
                                )
                            }



                            <a href="/items" class="flex font-semibold text-indigo-600 text-sm mt-10">

                                <svg class="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
                                Tiếp tục mua hàng
                            </a>
                        </div>

                        <div id="summary" class="w-1/4 px-8 py-10">
                            <h1 class="font-semibold text-2xl border-b pb-8">Order Summary</h1>
                            <div class="flex justify-between mt-10 mb-5">
                                <span class="font-semibold text-sm uppercase"> {getCartCount()} Item{getCartCount() > 1 ? 's' :''}</span>
                                {/* <span class="font-semibold text-sm">{getCartSubTotal()}</span> */}
                            </div>
                            <div>
                                <label class="font-medium inline-block mb-3 text-sm uppercase">Hình thức thanh toán</label>
                                <select class="block p-2 text-gray-600 w-full text-sm">
                                    <option>COD</option>
                                </select>
                            </div>
                            {/* <div class="py-10">
                                <label for="promo" class="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
                                <input type="text" id="promo" placeholder="Enter your code" class="p-2 text-sm w-full" />
                            </div> */}
                            {/* <button class="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">Apply</button> */}
                            <div class="border-t mt-8">
                                <div class="flex font-semibold justify-between py-6 text-sm uppercase">
                                    <span>Tổng hoá đơn</span>
                                    <span>{getCartSubTotal()}</span>
                                </div>
                                <button onClick={e => window.location.href = '/user-info/shipping'} class="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Đặt hàng</button>
                            </div>
                        </div>

                    </div>
                </div>
            </body>
        </div>

    )
}

export default CartScreen
