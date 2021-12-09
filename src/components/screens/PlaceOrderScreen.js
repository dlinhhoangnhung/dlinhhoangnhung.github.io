import React, { useEffect, useState } from 'react'
import CheckoutSteps from '../checkout/CheckoutSteps'
import { useSelector, useDispatch } from 'react-redux'
import '../../placeorder.css'
import { createOrder } from '../../redux/actions/orderActions'
import { ORDER_CREATE_RESET } from '../../redux/constant/orderConstants'
import Loading from '../loading.component'
import MessageBox from '../MessageBox'
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import history from '../../history'
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router'
import authService from '../services/auth.service'
import { removeFromCart } from "../../redux/actions/cartActions"
import { updateOrder } from '../../redux/actions/userActions'

export default function PlaceOrderScreen({ item }, props) {
    const history = useHistory();
    const isRedirect = useState(0)
    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart
    const dispatch = useDispatch()

    const orderCreate = useSelector((state) => state.getOrderCreate)
    console.log('orderCreate '+orderCreate)
    const { loading, success, error, order } = orderCreate
    const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
    cart.itemsPrice = toPrice(
        cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
    );
    cart.totalPrice = cart.itemsPrice;

    const getCartSubTotal = () => {
        return cartItems
            .reduce((price, item) => price + item.price * item.qty, 0)
    }

    // const orderId = localStorage.getItem('orderId')

    // let str = orderId;
    // let del_str=str.slice(1, str.length-1)

    const placeOrderHandler = async() => {
        console.log('hoat dong')
        await dispatch(createOrder({ ...cart, orderItems: cart.cartItems }))
            .then(
                (res) => {
                    // window.location.reload();
                    // history.push(`/order/${order._id}`);
                    // dispacth update order item into usermodel
                    // dispatch(updateOrder({ orderslist: del_str})) 27/11 k can vi order model co luu usêr id
                    dispatch(removeFromCart(cart.cartItems))
                    // console.log("order id : " +del_str)
                    toast("Order Successfully ! \n Chúng tôi sẽ liên hệ trong thời gian sớm nhất", {
                        type: "warning",
                    });
                  
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                }
            );
    }

    console.log(cart.cartItems + "cart.cartItems")
    // useEffect(() => {
    //     if (success) {
    //         props.history.push(`/order/${order._id}`)
    //         dispatch({ type: ORDER_CREATE_RESET })
    //     }
    // }, [dispatch, order, props.history, success])


    return (
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>



            <div class="h-screen grid grid-cols-3">
                <div class="lg:col-span-2 col-span-3 bg-indigo-50 space-y-8 px-12">
                    <div class="mt-8 p-4 relative flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-md">
                        <div class="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
                            <div class="text-yellow-500">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 sm:w-5 h-6 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div class="text-sm font-medium ml-3">Checkout</div>
                        </div>
                        <div class="text-sm tracking-wide text-gray-500 mt-4 sm:mt-0 sm:ml-4">Xem lại thông tin đã cung cấp và xác nhận đặt hàng.</div>
                        <div class="absolute sm:relative sm:top-auto sm:right-auto ml-auto right-4 top-4 text-gray-400 hover:text-gray-800 cursor-pointer">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </div>
                    </div>
                    <div class="rounded-md">
                        <form id="payment-form" method="POST" action="">
                            <section>
                                <h2 class="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">Shipping & Billing Information</h2>
                                <fieldset class="mb-3 bg-white shadow-lg rounded text-gray-600">
                                    <label class="flex border-b border-gray-200 h-12 py-3 items-center">
                                        <span class="text-right px-2">Name</span>
                                        <span>{cart.shippingInfo.fullName}</span>
                                    </label>
                                    <label class="flex border-b border-gray-200 h-12 py-3 items-center">
                                        <span class="text-right px-2">Phone</span>
                                        <span>{cart.shippingInfo.phone}</span>
                                    </label>
                                    <label class="flex border-b border-gray-200 h-12 py-3 items-center">
                                        <span class="text-right px-2">Address</span>
                                        <span >{cart.shippingInfo.address}</span>
                                    </label>
                                </fieldset>
                            </section>
                        </form>
                    </div>
                    {/* <div class="rounded-md">
                        <section>
                            <h2 class="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">Payment Information</h2>
                            <fieldset class="mb-3 bg-white shadow-lg rounded text-gray-600">
                                <label class="flex border-b border-gray-200 h-12 py-3 items-center">
                                    <span class="text-right px-2">Card</span>
                                    <input name="card" class="focus:outline-none px-3 w-full" placeholder="Card number MM/YY CVC" required="" />
                                </label>
                            </fieldset>
                        </section>
                    </div> */}
                    <button
                        type="button"
                        onClick={placeOrderHandler}
                        disabled={cart.cartItems.length === 0}
                        class="submit-button px-4 py-3 rounded-full bg-pink-400 text-white focus:ring focus:outline-none w-full text-xl font-semibold transition-colors">
                        Xác nhận đặt hàng
                    </button>
                    {loading && <Loading></Loading>}
                    {error && <MessageBox variant="danger">{error}</MessageBox>}
                </div>
                <div class="col-span-1 bg-white lg:block hidden">
                    <h1 class="py-6 border-b-2 text-xl text-gray-600 px-8">Order Summary</h1>
                    <ul class="py-6 border-b space-y-6 px-8">
                        {
                            (cartItems.map((item) => (
                                <li class="grid grid-cols-6 gap-2 border-b-1">
                                    <div class="col-span-1 self-center">
                                        <a href={`/items/${item.name}-${item.product}`}>
                                            <img alt="Product" className="rounded w-full" src={`http://localhost:3000/assets/imgs/products/${item.thumbnail}`} />
                                        </a>
                                    </div>
                                    <div class="flex flex-col col-span-3 pt-2">
                                        <span class="text-gray-600 text-md font-semi-bold">{item.name}</span>
                                        <span class="text-gray-400 text-sm inline-block pt-2">{item.textColor && item.textColor}</span>
                                        <span class="text-gray-400 text-sm inline-block pt-2">{item.textSize && item.textSize}</span>
                                    </div>
                                    <div class="col-span-2 pt-3">
                                        <div class="flex items-center space-x-2 text-sm justify-between">
                                            <span class="text-gray-400">{item.qty} x {item.price}</span>
                                            <span class="text-pink-400 font-semibold inline-block">{item.qty * item.price}đ</span>
                                        </div>
                                    </div>
                                </li>

                            )))
                        }
                        <span class="text-sm text-red-600">Chưa bao gồm phí ship</span>
                    </ul>
                    <div class="px-8 border-b">
                        <div class="flex justify-between py-4 text-gray-600">
                            <span>Hình thức thanh toán</span>
                            <span>COD</span>
                            {/* <span>Shipping</span>
                            <span class="font-semibold text-pink-500">Free</span> */}
                        </div>
                    </div>
                    <div class="font-semibold text-xl px-8 flex justify-between py-8 text-gray-600">
                        <span>Total</span>
                        <span>{getCartSubTotal()}</span>
                    </div>
                </div>
            </div>
        </div>
    )

    // return (
    //     <div>
    //         <CheckoutSteps step1 step2 step3></CheckoutSteps>
    //         <div className="row top">
    //             <div className="col-2">
    //                 <ul>
    //                     <li>
    //                         <div className="card card-body">
    //                             <h2>Shipping</h2>
    //                             <p>
    //                                 <strong>Name:</strong> {cart.shippingInfo.fullName} <br />
    //                                 <strong>Address: </strong> {cart.shippingInfo.address},
    //                                 <strong>Phone: </strong> {cart.shippingInfo.phone},

    //                             </p>
    //                         </div>
    //                     </li>

    //                     <li>
    //                         <div className="card card-body">
    //                             <h2>Order Items</h2>
    //                             <ul>
    //                                 {cart.cartItems.map((item) => (
    //                                     <li key={item.product}>
    //                                         <div className="row">
    //                                             <div>
    //                                                 <img
    //                                                     src={item.thumbnail}
    //                                                     alt={item.name}
    //                                                     className="small"
    //                                                 ></img>
    //                                             </div>
    //                                             <div className="min-30">
    //                                                 <Link to={`/product/${item.product}`}>
    //                                                     {item.name}
    //                                                 </Link>
    //                                             </div>

    //                                             <div>
    //                                                 {item.qty} x ${item.price} = ${item.qty * item.price}
    //                                             </div>
    //                                         </div>
    //                                     </li>
    //                                 ))}
    //                             </ul>
    //                         </div>
    //                     </li>
    //                 </ul>
    //             </div>
    //             <div className="col-1">
    //                 <div className="card card-body">
    //                     <ul>
    //                         <li>
    //                             <h2>Order Summary</h2>
    //                         </li>
    //                         <li>
    //                             <div className="row">
    //                                 <div>Items</div>
    //                                 <div>${cart.itemsPrice.toFixed(2)}</div>
    //                             </div>
    //                         </li>


    //                         <li>
    //                             <div className="row">
    //                                 <div>
    //                                     <strong> Order Total</strong>
    //                                 </div>
    //                                 <div>
    //                                     <strong>${cart.totalPrice.toFixed(2)}</strong>
    //                                 </div>
    //                             </div>
    //                         </li>
    //                         <li>
    //                             <button
    //                                 type="button"
    //                                 onClick={placeOrderHandler}
    //                                 className="primary block"
    //                                 disabled={cart.cartItems.length === 0}
    //                             >
    //                                 Place Order
    //                             </button>
    //                         </li>
    //                         {loading && <Loading></Loading>}
    //                         {error && <MessageBox variant="danger">{error}</MessageBox>}
    //                     </ul>
    //                 </div>
    //             </div>
    //         </div>
    //     </div >
    // )
}

