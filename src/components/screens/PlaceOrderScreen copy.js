import React, { useEffect } from 'react'
import CheckoutSteps from '../checkout/CheckoutSteps'
import { useSelector, useDispatch } from 'react-redux'
import '../../placeorder.css'
import { createOrder } from '../../redux/actions/orderActions'
import { ORDER_CREATE_RESET } from '../../redux/constant/orderConstants'
import Loading from '../loading.component'
import MessageBox from '../MessageBox'

export default function PlaceOrderScreen({ item }, props) {
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
    const getUserSignin = useSelector((state) => state.getUserSignin)
    const userInfo = localStorage.getItem('userInfo')
    // const id = getUserSingin.id
    // const { userInfo } = getUserSingin   
    // const o = {
    //     orderItems: cart.cartItems,
    //     shippingInfo: cart.shippingInfo,
    //     itemsPrice: cart.itemsPrice,
    //     totalPrice: cart.totalPrice,
    //     user: id
    // } 
    console.log("getUserSignin: " + getUserSignin)

    const placeOrderHandler = () => {
        dispatch(createOrder({
            totalPrice: cart.totalPrice,
            itemsPrice: cart.itemsPrice,
            shippingInfo: cart.shippingInfo,
            // user: userInfo.id,
            orderItems: cart.cartItems
        }))
    }

    console.log(cart.cartItems + "cart.cartItems")
    useEffect(() => {
        if (success) {
            props.history.push(`/order/${order._id}`)
            dispatch({ type: ORDER_CREATE_RESET })
        }
    }, [dispatch, order, props.history, success])

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
                                            <div className="border-bottom w-100"></div>
                                            <div className="d-flex justify-content-between pt-6">
                                                <div className="d-flex flex-column flex-root">
                                                    <span className="font-weight-bolder mb-2">DATA</span>
                                                    <span className="opacity-70">Dec 12, 2017</span>
                                                </div>
                                                <div className="d-flex flex-column flex-root">
                                                    <span className="font-weight-bolder mb-2">INVOICE NO.</span>
                                                    <span className="opacity-70">GS 000014</span>
                                                </div>
                                                <div className="d-flex flex-column flex-root">
                                                    <span className="font-weight-bolder mb-2">INVOICE TO.</span>
                                                    <span className="opacity-70">
                                                        Iris Watson, P.O. Box 283 8562 Fusce RD. <br />
                                                        Fredrick Nebraska 20620
                                                    </span>
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
                                                {/* <button
                                                    type="button"
                                                    onClick={cart.totalPrice}
                                                    className="primary block"
                                                    disabled={cart.cartItems.length === 0}
                                                >
                                                    Place Order
                                                </button> */}
                                                {/* 
                                                <button 
                                                    type="button" 
                                                    className="btn btn-primary font-weight-bold" 
                                                    onclick={placeOrderHandler}></button> */}
                                                <button
                                                    type="button"
                                                    onClick={placeOrderHandler}
                                                    className="primary block"
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
}

