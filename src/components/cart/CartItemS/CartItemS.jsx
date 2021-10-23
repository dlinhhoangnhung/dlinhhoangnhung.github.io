import React from 'react'
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core'
import useStyles from '../style'

const CartItemS = ({item, qtyChangeHandler, removeHandler, increament2, decreament2}) => {
    const classes = useStyles()

    return (
        <div>
            <CardMedia image="../../../../public/assets/imgs/products/${item.product}" style={{paddingTop: '50%'}} alt={item.name} className={classes.media}/>
            <CardContent className={classes.CardContent}>
                <Typography variant="h4">{item.name}</Typography>
                <Typography variant="h5"></Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <div className={classes.buttons}>
                    <Button type="button" size="small" onClick={() => decreament2(item.product, item.qty)}>-</Button>
                    <Typography>{item.qty}</Typography>
                    <Button type="button" size="small" onClick={() => increament2(item.product, item.qty)}>+</Button>
                </div>
                <Button variant="contained" type="button" color="secondary"onClick={() => removeHandler(item.product)}>
                    Xoá
                </Button>
            </CardActions>
        </div>
    )
}

export default CartItemS
