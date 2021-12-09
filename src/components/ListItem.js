import CartItem from './cart/CartItem';
import '../css/client.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react";

import { addToCart, removeFromCart, adjustQty } from "../redux/actions/cartActions"

const ListItem = ({ item }) => {
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    useEffect(() => { }, []);

    const qtyChangeHandler = (id, qty) => {
        dispatch(adjustQty(id, Number(qty)))
    }

    ///defdafadfad
    const autoRemove = (id) => {
        if (item.qty === 0) {
            dispatch(removeFromCart(id))
        }
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
        <li className="list-inline-item position-relative">
            <a
                id="shoppingCartDropdownInvoker"
                className="btn btn-xs btn-icon btn-text-secondary"
                href="javascript:;"
                role="button"
                aria-controls="shoppingCartDropdown"
                aria-haspopup="true"
                aria-expanded="false"
                data-unfold-event="hover"
                data-unfold-target="#shoppingCartDropdown"
                data-unfold-type="css-animation"
                data-unfold-duration="300"
                data-unfold-delay="300"
                data-unfold-hide-on-scroll="true"
                data-unfold-animation-in="slideInUp"
                data-unfold-animation-out="fadeOut"
            >
                <span className="fas fa-shopping-cart btn-icon__inner"></span>
                <span className="badge badge-sm badge-primary badge-pos rounded-circle">1</span>
            </a>

            <div id="shoppingCartDropdown" className="dropdown-menu dropdown-unfold dropdown-menu-right p-0" aria-labelledby="shoppingCartDropdownInvoker" style="width: 350px;">
                <div className="card">
                    {/* <!-- Header --> */}
                    <div className="card-header bg-light py-3 px-5">
                        <span className="font-weight-semi-bold">Your Shopping Cart</span>
                    </div>
                    {/* <!-- End Header --> */}

                    {/* <!-- Body --> */}
                    <div className="card-body p-5">
                        <div className="media">
                            <div className="u-avatar mr-3">
                                <img className="img-fluid rounded" src="../../assets/img/100x100/img14.jpg" alt="Image Description" />
                            </div>
                            <div className="media-body">
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="d-block font-weight-semi-bold">Nike</span>
                                    <button type="button" className="close" aria-label="Close" onclick="Custombox.modal.close();">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <span className="d-block font-size-1">Flex 2017 RN Lightweight Casual Hoodie - Men's</span>
                                <span className="d-block text-primary font-weight-semi-bold">$56.99</span>
                                <small className="d-block text-muted">Color: Red</small>
                                <small className="d-block text-muted">Size: 8 Medium</small>
                                <small className="d-block text-muted">Quantity: 1</small>
                            </div>
                        </div>
                    </div>
                    {/* <!-- End Body --> */}

                    {/* <!-- Footer --> */}
                    <div className="card-footer text-center p-5">
                        <div className="mb-3">
                            <span className="d-block font-weight-semi-bold">Order Total</span>
                            <span className="d-block">$56.99</span>
                        </div>
                        <div className="mb-2">
                            <a className="btn btn-sm btn-soft-primary transition-3d-hover" href="../shop/shop-checkout.html">Review Bag and Checkout</a>
                        </div>
                        <p className="small mb-0"><a className="link-muted" href="javascript:;">Continue Shopping</a></p>
                    </div>
                    {/* <!-- End Footer --> */}
                </div>
            </div>
        </li>






        // <div classNameNameNameName="bagscreen" >
        //     <div classNameNameName="cartscreen-left">
        //         <h2>Shopping Bag</h2>
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
        //                 />
        //             )))
        //         }
        //     </div>


        // </div>
    )
}

export default ListItem



