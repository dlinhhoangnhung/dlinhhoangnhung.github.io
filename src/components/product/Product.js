import React, { Component, useState, useEffect } from "react"
import { addToCart } from "../../redux/actions/cartActions";
import { Link } from "react-router-dom";
import { Grid, IconButton, CardActions } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { ToastContainer } from "react-toastify";
import ProductScreen from "../screens/productScreen";
import { Container, Row, Col, Box } from "reactstrap";
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails } from "../../redux/actions/productAction"
import "../../client.css"
import { AddShoppingCart } from "@material-ui/icons";
import useStyles from './style'

const Product = ({ thumbnail, name, desc, images, price, productId, cateId, history }) => {
    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.getProductDetails)
    const { loading, error, product } = productDetails
    const classes = useStyles()
    const [qty, setQty] = useState(1)
    const qtyChangeHandler = (productId, qty) => {
        dispatch(addToCart(productId, qty))
    }
    const addToCartHandler = () => {
        dispatch(addToCart(productId, qty))
    }
    return (

        <div className="product-card">
            <img src={`http://localhost:3000/assets/imgs/products/${thumbnail}`} />
            <div className="product-box">
                {/* <h2 title={name}>
                    {name}
                </h2> */}
                <span>{price}</span>
                {/* <p>{desc}</p> */}
            </div>
            <CardActions onClick={addToCartHandler} disableSpacing className={classes.cardActions}>
                <IconButton aria-label="Add to Cart">
                    <AddShoppingCart />
                </IconButton>
            </CardActions>
            <div className="row-btn">


                <a href={`/items/${name}-${productId}`} id="btn-buy">Buy</a>
                <a href={`/items/${name}-${productId}`} id="btn-view">View</a>

            </div>
        </div>

    )
}

export default Product

// <Card className={classes.root}>
// <div className="item-list">
//     {/* <Grid container spacing={2} direction="row"  > */}
//         <Grid item xs={3} >
//             <Paper className={classes.paper}>
//                 <Card className={classes.root} variant="outlined" >
//                     <CardMedia style={{ height: "250px", paddingTop: "2%" }}
//                         className={classes.media}
//                         image={"http://localhost:3000/assets/imgs/products/" + thumbnail}
//                         title="Contemplative Reptile"
//                     />
//                     <CardContent>
//                         <Typography color="textSecondary" gutterBottom>
//                             {name}
//                         </Typography>
//                         <Typography variant="h5" component="h2">
//                             {price}
//                         </Typography>
//                         <Typography className={classes.pos} color="textSecondary">
//                             adjective
//                         </Typography>
//                         <Typography variant="body2" component="p">
//                             {desc}
//                         </Typography>
//                     </CardContent>


//                     <div className="row">
//                         <CardActions>
//                             <a href={`/items/${productId}`}>View</a>
//                         </CardActions>
//                         <CardActions>
//                             <button type="button">Add to Cart</button>
//                         </CardActions>
//                     </div>
//                 </Card>
//             </Paper>
//         </Grid>
//     {/* </Grid> */}

// </div>
// <ToastContainer />
// </Card>




    // <div  className = "product" >
    //             <img src={`http://localhost:3000/assets/imgs/products/${thumbnail}`} />

    //             <div className="product-info">
    //                 <p className="info-name">{name}</p>
    //                 <p className="info-description">
    //                     {desc}
    //                 </p>
    //                 <p className="info-price">{price}</p>
    //                 <Link to={`/items/${productId}`}>View</Link>
    //             </div>
    //         </div >