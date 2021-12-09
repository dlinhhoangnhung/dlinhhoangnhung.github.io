import CartItem from '../../cart/CartItem';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react";

import { removeFromCart, adjustQty, increaseItem, decreaseItem, decreaseQty, increaseQty } from "../../../redux/actions/cartActions"
import { browserHistory } from 'react-router'
import history from '../../../history';
import authService from '../../services/auth.service';

const Cart = () => {
    const user = authService.getCurrentUser()
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    useEffect(() => { }, []);


    const increament = (id) => {
        dispatch(increaseItem(id))
        console.log("+:" + id)
    }

    const decreament = (id) => {
        dispatch(decreaseItem(id))
    }

    const increament2 = (id, qty) => {
        dispatch(increaseQty(id, qty))
    }

    const decreament2 = (id, qty) => {
        qty === 1 ? removeHandler(id) :
            dispatch(decreaseQty(id, qty))
    }

    const qtyChangeHandler = (id, qty) => {
        dispatch(adjustQty(id, Number(qty)))
    }

    const removeHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const getCartCount = () => {
        return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0)
    }

    const getCartSubTotal = () => {
        return cartItems
            .reduce((price, item) => price + item.price * item.qty, 0)
    }

    return (
        // <div className="cartscreen" style={{ paddingLeft: 140 }}>
        //     <div className="cartscreen-left">
        //         <h2>Shopping Cart</h2>
        //         {
        //             cartItems.length === 0 ? (
        //                 <div>
        //                     Your cart is empty. <Link to="/">Go Back</Link>
        //                 </div>
        //             ) : (cartItems.map((item) => (
        //                 <CartItem
        //                     key={item.product}
        //                     item={item}
        //                     qtyChangeHandler={qtyChangeHandler}
        //                     removeHandler={removeHandler}
        //                     increament2={increament2}
        //                     decreament2={decreament2}
        //                 />
        //             )))
        //         }
        //     </div>

        //     <div className="cartscreen-right">
        //         <div className="cartscreen-info">
        //             <p>Subtotal ({getCartCount()})</p>
        //             <p>{getCartSubTotal()}đ</p>


        //             <a href="/shipping"> 
        //                 <button
        //                     className="btn btn-secondary btn-lg btn-block text-left"
        //                     type="button"
        //                     // onClick={checkoutHandler}
        //                 >
        //                     <span className="float-left"><i className="mdi mdi-cart-outline" /> Đặt hàng </span>
        //                     <span className="float-right"><strong>

        //                     </strong> <span className="mdi mdi-chevron-right" /></span></button></a>)


        //         </div>
        //     </div>
        //     <div>

        //     </div>
        // </div>

        <div class="z-40 fixed inset-0 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
            <div class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">
                <div class="w-screen max-w-md">
                    <div class="h-screen mb-2 flex flex-col bg-white shadow-xl ">
                        <div class="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                            <div class="flex items-start justify-between">
                                <h2 class="text-lg font-medium text-gray-900" id="slide-over-title">
                                    Shopping cart
                                </h2>
                                <div class="ml-3 h-7 flex items-center">
                                    <button type="button" class="-m-2 p-2 text-gray-400 hover:text-gray-500">
                                        <span class="sr-only">Close panel</span>
                                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div class="mt-8">
                                <div class="flow-root">
                                    <ul role="list" class="-my-6 divide-y divide-gray-200">
                                        {
                                            cartItems.length === 0 ? (
                                                <div>
                                                    Your cart is empty.
                                                </div>
                                            ) : (cartItems.map((item) => (
                                                <CartItem
                                                    key={item.product}
                                                    item={item}
                                                    qtyChangeHandler={qtyChangeHandler}
                                                    removeHandler={removeHandler}
                                                    increament2={increament2}
                                                    decreament2={decreament2}
                                                />
                                            )))
                                        }

                                    </ul>
                                </div>
                            </div>

                        </div>
                        {/* <p className="flex justify-end text-red-500" onClick={e => window.location.href = '/items'}className="texy-base">Quay lại</p> */}

                        {
                            cartItems.length > 0 && (
                                <div class="border-t border-gray-200 py-6 px-4 sm:px-6">
                                    <div class="flex justify-between text-base font-medium text-gray-900">
                                        <p>Tổng hoá đơn</p>
                                        <p>{getCartSubTotal()}đ</p>
                                    </div>
                                    {/* <p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p> */}
                                    <div class="mt-6">
                                        <a href="/user-info/shipping" class="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">Đặt hàng</a>
                                    </div>
                                    <div class="mt-6 flex justify-center text-sm text-center text-gray-500">
                                        <p>
                                            <button onClick={e => window.location.href = '/user-view/cart'}  type="button" class="text-indigo-600 font-medium hover:text-indigo-500"><span aria-hidden="true">Xem giỏ hàng &rarr;</span></button>
                                        </p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
