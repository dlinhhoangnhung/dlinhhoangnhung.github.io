// import React, { useState } from 'react'
// import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
// import { Link } from 'react-router-dom'
// import { useSelector, useDispatch } from "react-redux";
// import ListItem from '../ListItem';

// import { addToCart, removeFromCart, adjustQty } from "../../redux/actions/cartActions"
// import { Container, Typography, Grid, Button } from '@material-ui/core';
// import {
//     Dropdown,
//     DropdownToggle,
//     DropdownMenu,
//     DropdownItem
// } from "reactstrap";

// import CartItem from './CartItem';
// import { classes } from 'istanbul-lib-coverage';
// import useStyles from './style'
// import basket from '../../assets/figma-img/basket.svg'
// import '../../Navbar.css'

// const CartM = props => {
//     // const {
//     //     handleMouseEnter,
//     //     handleMouseLeave,
//     //     handleToggle,
//     //     options,
//     //     name,
//     //     stateKeys
//     // } = props;

//     const classes = useStyles()
//     const [hover, setHover] = useState(false);
//     const updateHover = () => {
//         setHover(!hover);
//     };

//     console.log(hover);

//     const cart = useSelector((state) => state.cart)
//     const { cartItems } = cart
//     const getCartSubTotal = () => {
//         return cartItems
//             .reduce((price, item) => price + item.price * item.qty, 0)
//     }
//     const getCartCount = () => {
//         return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
//     };
//     const dispatch = useDispatch()
//     const qtyChangeHandler = (id, qty) => {
//         dispatch(adjustQty(id, Number(qty)))
//     }
//     const removeHandler = (id) => {
//         dispatch(removeFromCart(id))
//     }
//     const isEmpty = !cartItems.length
//     const EmptyCart = () => (
//         <Typography variant="subtitle1">không có sản phẩm được thêm</Typography>
//     )
//     const FilledCart = () => (
//         <>
//             <Grid>
//                 {cartItems.map((item) => (
//                     <Grid item xs={12} sm={4} key={item.product}>
//                         <div>{item.name}</div>
//                         {/* <div>{item.qty}</div> */}
//                         {/* <div>{item.price}</div> */}
//                     </Grid>
//                 ))}
//             </Grid>
//             <div className={classes.cardDetails}>
//                 <Typography variant="h4">Subtotal: ({getCartCount()})</Typography>
//                 <div>
//                     <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary">Empty Cart</Button>
//                     <Button className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
//                 </div>
//             </div>
//         </>

//     )
//     return (

        
//         <div>
//             <a href="/cart">
//                 <img class="basket-btn" src={basket}/>

//                 {/* <ShoppingBasketIcon color="disabled" className="cart-link" style={{ fontSize: 24, marginLeft: 30, color: 'rgba(244, 236, 236, 0.913)' }} /> */}
//                 {getCartCount()}
//                 {/* Cart <span className="cartlogo__badge">{getCartCount()}</span> */}
//                 {/* {hover ? <ListItem/> : null} */}



//             </a>

//         </div>
//     )
// }

// export default CartM


// //     < Dropdown
// // className = "d-inline-block"
// // onMouseOver = { handleMouseEnter }
// // onMouseLeave = { handleMouseLeave }
// // // isOpen={stateKeys[name]}
// // toggle = { handleToggle }
// //     >
// // {/* <DropdownToggle name={name} caret>
// //                         Dropdown1
// //                     </DropdownToggle> */}
// //     < DropdownMenu >
// // {
// //     cartItems.length === 0 ? (
// //         <DropdownItem >empty</DropdownItem>
// //     ) : (cartItems.length &&
// //         cartItems.map((item) => (
// //             <div>{item.product}</div>
// //         )))
// // }

// //                     </ >
// //                 </Dropdown >