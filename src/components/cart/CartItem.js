import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import "../cart/cartItem.css"
import { removeFromCart } from '../../redux/actions/cartActions'
import { useDispatch, useSelector } from 'react-redux'
import { increaseItem, decreaseItem, decreaseQty, increaseQty } from "../../redux/actions/cartActions"
import { Wrapper } from './cartItem.css'

const CartItem = ({ item, qtyChangeHandler, removeHandler, increament2, decreament2 }) => {
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
        <li class="py-6 flex">
            <div class="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                <img src={`./assets/imgs/products/${item.thumbnail}`} alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." class="w-full h-full object-center object-cover" />
            </div>
            <div class="ml-4 flex-1 flex flex-col">
                <div>
                    <div class="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                            <a href="/user-view/item-${item.product}">
                                {item.name}
                            </a>
                        </h3>
                        <p class="ml-4">
                            {item.price * item.qty}
                        </p>
                    </div>
                    <p class="mt-1 text-sm text-gray-500">
                        {item.textColor}
                    </p>
                </div>
                <div class="flex-1 flex items-end justify-between text-sm">
                    <div className="inrow space-x-5">
                        <button
                            className='z-40'
                            size="small"
                            disableElevation
                            variant="contained"
                            onClick={() => decreament2(item.product, item.qty, item.textSize, item.textColor)}
                        >
                            -
                        </button>
                        <p min="1" type="number" className="text-gray-500" value={item.qty} onChange={(e) => qtyChangeHandler(item.product, e.target.value)}>{item.qty}</p>
                        <button
                            className='z-40'
                            size="small"
                            disableElevation
                            variant="contained"
                            onClick={() => increament2(item.product, item.qty, item.textSize, item.textColor)}
                        >
                            +
                        </button>
                    </div>

                    <div class="flex z-40">
                        <button onClick={() => removeHandler(item.product , item.textSize, item.textColor)} type="button" class="font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                    </div>
                </div>
            </div>
        </li >
        // <div className='cartitem'>
        //     <div className="cartitem-img">
        //         <img src={`./assets/imgs/products/${item.thumbnail}`} />
        //     </div>

        //     <Link to={`/items/${item.name}-${item.product}`}>
        //         <p>{item.name}</p>
        //     </Link>

        //     <p className="cartitem-price">đ{item.price * item.qty}</p>

        //     <div className="buttons">
        //         <Button
        //             size="small"
        //             disableElevation
        //             variant="contained"
        //             onClick={() => decreament2(item.product, item.qty)}
        //         >

        //             -
        //         </Button>
        //         <p min="1" type="number" className="cartitem-select" value={item.qty} onChange={(e) => qtyChangeHandler(item.product, e.target.value)}>{item.qty}</p>
        //         <Button
        //             size="small"
        //             disableElevation
        //             variant="contained"
        //             onClick={() => increament2(item.product, item.qty)}
        //         >
        //             +
        //         </Button>
        //     </div>
        //     <button onClick={() => removeHandler(item.product)} className="cartitem-deleteBtn">
        //         Delete
        //     </button>
        // </div>
    )
}

export default CartItem


// {/* <div className='cartitem'>
//                 <div className="cartitem-img">
//                     <img src="{`./assets/imgs/products/${item.thumbnail}`}" />
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