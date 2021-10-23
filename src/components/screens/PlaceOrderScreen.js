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

    const orderId = localStorage.getItem('orderId')

    let str = orderId;
    let del_str=str.slice(1, str.length-1)

    const placeOrderHandler = () => {
        console.log('hoat dong')
        dispatch(createOrder({ ...cart, orderItems: cart.cartItems }))
            .then(
                () => {
                    // window.location.reload();

                    // history.push(`/order/${order._id}`);
                    // dispacth update order item into usermodel
                    dispatch(updateOrder({ orderslist: del_str}))

                    dispatch(removeFromCart(cart.cartItems))
                    console.log("order id : " +del_str)
                    history.push(`/cart`);
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
            <div>
                <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
                    <div className="d-flex flex-column-fluid">
                        <div className="container">
                            <div className="card card-custom overflow-hidden">
                                <div className="card-body p-0">
                                    <div className="row justify-content-center py-8 px-8 py-md-27 px-md-0">
                                        <div className="col-md-9">
                                            <div className="d-flex justify-content-between pb-10 pb-md-20 flex-column flex-md-row">
                                                <h1 className="display-4 font-weight-boldest mb-10">INVOICE</h1>
                                                <div className="d-flex flex-column align-items-md-end px-0">
                                                    <a href="#" className="mb-5">
                                                        <img src="assets/img/logo-dark.png" alt="" />
                                                    </a>
                                                    <span className="d-flex flex-column align-items-md-end opacity-70">
                                                        <span>{cart.shippingInfo.fullName}</span>
                                                        <span>{cart.shippingInfo.address}</span>
                                                        <span >{cart.shippingInfo.phone}</span>
                                                    </span>
                                                </div>
                                            </div>
                                            {/* <div className="border-bottom w-100"></div> */}
                                            <div className="d-flex justify-content-between pt-6">
                                                <div className="d-flex flex-column flex-root">
                                                    <span className="font-weight-bolder mb-2">{cart.shippingInfo.fullName}</span>
                                                    <span className="font-weight-bolder mb-2">{cart.shippingInfo.phone}</span>
                                                </div>
                                                <div className="d-flex flex-column flex-root">
                                                    <span className="font-weight-bolder mb-2">Địa chỉ:</span>
                                                    <span className="opacity-70">{cart.shippingInfo.address}</span>
                                                </div>
                                                <div className="d-flex flex-column flex-root">
                                                    <span className="font-weight-bolder mb-2">Hình thức thanh toán</span>
                                                    <span className="opacity-70">COD</span>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center py-8 px-8 py-md-10 px-md-0">
                                        <div className="col-md-9">
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th className="pl-0 font-weight-bold text-muted text-uppercase"></th>
                                                            <th className="pl-0 font-weight-bold text-muted text-uppercase">Items</th>
                                                            <th className="text-right font-weight-bold text-muted text-uppercase">Price</th>
                                                            <th className="text-right font-weight-bold text-muted text-uppercase">Quantity</th>
                                                            <th className="text-right pr-0 font-weight-bold text-muted text-uppercase">Amount</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            (cartItems.map((item) => (
                                                                <tr className="font-weight-boldest">
                                                                    <a href={`/items/${item.name}-${item.product}`}>
                                                                        <img className="img" src={`http://localhost:3000/assets/imgs/products/${item.thumbnail}`} />
                                                                    </a>
                                                                    <td className="pl-0 pt-7">{item.name}</td>
                                                                    <td className="text-right pt-7">{item.price}</td>
                                                                    <td className="text-right pt-7">{item.qty}</td>
                                                                    <td className="text-right pt-7">{item.qty * item.price}đ</td>
                                                                </tr>

                                                            )))
                                                        }
                                                    </tbody>

                                                </table>
                                                <div className="border-bottom w-100"></div>
                                                <div style={{ textAlign: 'right', alignSelf: 'stretch', fontSize: '23px', color: 'blue', fontWeight: 'bold', marginTop: 10 }}>{getCartSubTotal()}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <div className="row justify-content-center bg-gray-100 py-8 px-8 py-md-10 px-md-0">
                                        <div className="col-md-9">
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th className="font-weight-bold text-muted text-uppercase">BANK</th>
                                                            <th className="font-weight-bold text-muted text-uppercase">ACC.NO.</th>
                                                            <th className="font-weight-bold text-muted text-uppercase">DUE DATE</th>
                                                            <th className="font-weight-bold text-muted text-uppercase">TOTAL AMOUNT</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr className="font-weight-bolder">
                                                            <td>BARCLAYS UK</td>
                                                            <td>12345678909</td>
                                                            <td>Jan 07, 2018</td>
                                                            <td className="text-danger font-size-h3 font-weight-boldest">20,600.00</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="row justify-content-center py-8 px-8 py-md-10 px-md-0">
                                        <div className="col-md-9">
                                            <div className="d-flex justify-content-between">
                                                {/* 
                                                <button 
                                                    type="button" 
                                                    className="btn btn-primary font-weight-bold" 
                                                    onclick={placeOrderHandler}></button> */}
                                                <button
                                                    type="button"
                                                    onClick={placeOrderHandler}
                                                    className=""
                                                    disabled={cart.cartItems.length === 0}
                                                >
                                                    Place Order
                                                </button>
                                                {loading && <Loading></Loading>}
                                                {error && <MessageBox variant="danger">{error}</MessageBox>}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div >
                        </div >
                    </div >
                </div >

            </div >
        </div >
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

