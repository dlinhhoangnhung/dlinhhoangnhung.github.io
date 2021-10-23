import React from 'react'
import useStyles from './style'
import { useSelector, useDispatch } from "react-redux";
import { Container, Typography, Grid, Button } from '@material-ui/core';
import CartItemS from './CartItemS/CartItemS';
import { removeFromCart, adjustQty, decreaseQty, increaseQty } from "../../redux/actions/cartActions"
import { Link } from 'react-router-dom'


const CartS = () => {
    const classes = useStyles()
    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart
    const getCartSubTotal = () => {
        return cartItems
            .reduce((price, item) => price + item.price * item.qty, 0)
    }
    const dispatch = useDispatch()
    const increament2 = (id, qty) => {
        dispatch(increaseQty(id, qty))
    }

    const removeHandler = (id) => {
        dispatch(removeFromCart(id))
    }
    const decreament2 = (id, qty) => {
        qty === 1 ? removeHandler(id) :
            dispatch(decreaseQty(id, qty))
    }

    const qtyChangeHandler = (id, qty) => {
        dispatch(adjustQty(id, Number(qty)))
    }
    const isEmpty = !cartItems.length
    const EmptyCart = () => (
        <Typography variant="subtitle1">không có sản phẩm được thêm</Typography>
    )
    const FilledCart = () => (
        <>
            <Grid>
                {cartItems.map((item) => (
                    <Grid item xs={12} sm={4} key={item.product}>
                        <CartItemS item={item}
                         key={item.product}
                         qtyChangeHandler={qtyChangeHandler}
                         removeHandler={removeHandler}
                         increament2={increament2}
                         decreament2={decreament2}
                        />
                        
                        {/* <div>{item.qty}</div> */}
                        {/* <div>{item.price}</div> */}
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">Subtotal: ({getCartSubTotal()})</Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary">Empty Cart</Button>
                    <Button component={Link} to="/checkout" className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
                </div>
            </div>
        </>

    )
    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} varaint="h3" gutterBottom>Giỏ của bạn</Typography>
            {isEmpty ? <EmptyCart /> : <FilledCart />}
        </Container>
    )
}

export default CartS
