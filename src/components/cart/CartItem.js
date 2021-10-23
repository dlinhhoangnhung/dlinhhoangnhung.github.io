import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import "../cart/cartItem.css"
import { removeFromCart } from '../../redux/actions/cartActions'
import { useDispatch, useSelector } from 'react-redux'
import { increaseItem, decreaseItem, decreaseQty, increaseQty } from "../../redux/actions/cartActions"
import Button from '@material-ui/core/Button';
import { Wrapper } from './cartItem.css'

const CartItem = ({ item, qtyChangeHandler, removeHandler, increament2, decreament2}) => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    // const increament = () => {
    //     dispatch(increaseItem(item.product))
    //     // console.log("+:" )
    // }

    // const decreament = () => {
    //     dispatch(decreaseItem(item.product))
    // }

    // const increament2 = () => {
    //     dispatch(increaseQty(item.product, item.qty))
    //     console.log("+:" +item.id)
    // }

    // const decreament2 = () => {
    //     console.log("-:" +item.id)

    //     dispatch(decreaseQty(item.product,item.qty))
    // }

    return (
        <div className='cartitem'>
            <div className="cartitem-img">
                <img src={`http://localhost:3000/assets/imgs/products/${item.thumbnail}`} />
            </div>

            <Link to={`/items/${item.name}-${item.product}`}>
                <p>{item.name}</p>
            </Link>

            <p className="cartitem-price">đ{item.price * item.qty}</p>

            <div className="buttons">
                <Button
                    size="small"
                    disableElevation
                    variant="contained"
                    onClick={() => decreament2(item.product, item.qty)}
                >

                    -
                </Button>
                <p min="1" type="number" className="cartitem-select" value={item.qty} onChange={(e) => qtyChangeHandler(item.product, e.target.value)}>{item.qty}</p>
                <Button
                    size="small"
                    disableElevation
                    variant="contained"
                    onClick={() => increament2(item.product, item.qty)}
                >
                    +
                </Button>
            </div>
            <button onClick={() => removeHandler(item.product)} className="cartitem-deleteBtn">
                Delete
            </button>
        </div>
    )
}

export default CartItem


// {/* <div className='cartitem'>
//                 <div className="cartitem-img">
//                     <img src="{`http://localhost:3000/assets/imgs/products/${item.thumbnail}`}" />
//                 </div>

//                 <Link to={`/items/${item.product}`}>
//                     <p>{item.name}</p>
//                 </Link>

//                 <p className="cartitem-price">đ{item.price * item.qty}</p>
//                 {/* <div className="buttons"> */}
//                 <Button
//                     size="small"
//                     disableElevation
//                     variant="contained">
//                     -
//                 </Button>
//                 <p min="1" type="number" className="cartitem-select" value={item.qty} onChange={(e) => qtyChangeHandler(item.product, e.target.value)}>{item.qty}</p>
//                 <Button
//                     size="small"
//                     disableElevation
//                     variant="contained">
//                     +
//                 </Button>
//                 {/* </div> */}
//                 <button onClick={() => removeHandler(item.product)} className="cartitem-deleteBtn">
//                     Delete
//                 </button>
//             </div> */}