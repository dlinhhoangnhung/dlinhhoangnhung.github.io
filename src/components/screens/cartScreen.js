import CartItem from '../cart/CartItem'
import '../../client.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react";

import { removeFromCart, adjustQty, increaseItem, decreaseItem, decreaseQty, increaseQty } from "../../redux/actions/cartActions"
import { browserHistory } from 'react-router'
import history from '../../history';
import authService from '../services/auth.service';

const CartScreen = ({ item }) => {
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
        <div className="cartscreen" style={{ paddingLeft: 140 }}>
            <div className="cartscreen-left">
                <h2>Shopping Cart</h2>
                {
                    cartItems.length === 0 ? (
                        <div>
                            Your cart is empty. <Link to="/">Go Back</Link>
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
            </div>

            <div className="cartscreen-right">
                <div className="cartscreen-info">
                    <p>Subtotal ({getCartCount()})</p>
                    <p>{getCartSubTotal()}đ</p>
            

                    <a href="/shipping"> 
                        <button
                            className="btn btn-secondary btn-lg btn-block text-left"
                            type="button"
                            // onClick={checkoutHandler}
                        >
                            <span className="float-left"><i className="mdi mdi-cart-outline" /> Đặt hàng </span>
                            <span className="float-right"><strong>

                            </strong> <span className="mdi mdi-chevron-right" /></span></button></a>)
                        
                    
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}

export default CartScreen
