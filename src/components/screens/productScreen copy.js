// import React, { Component, useState, useEffect } from "react"
// import { useSelector,useDispatch, connect } from 'react-redux'
// import { BrowserRouter as Router, Route, Link } from "react-router-dom"
// import axios from "axios"
// import { render } from "@testing-library/react"
// import Navbar from "../navbar.component"
// import { ToastContainer } from 'react-toastify';
// import { Grid } from "@material-ui/core"
// import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
// import CardMedia from '@material-ui/core/CardMedia';
// import Typography from '@material-ui/core/Typography';
// import Loading from "../loading.component"
// import { getProductDetails } from "../../redux/actions/productAction"
// import { addToCart } from "../../redux/actions/cartActions"

// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//     },
//     paper: {
//         padding: theme.f(2),
//         textAlign: 'center',
//         color: theme.palette.text.secondary,
//     },
// }));
// const classes = useStyles


// const ProductScreen = ({ match, history }) => {
//     const [qty, setQty] = useState(1)
//     const dispatch = useDispatch()
//     const productDetails = useSelector((state) => state.getProductDetails)
//     const { loading, error, product } = productDetails
//     const qtyChangeHandler = (id, qty) => {
//         dispatch(addToCart(id, qty))
//     }

//     useEffect(() => {
//         if (product && match.params.id !== product._id) {
//             dispatch(getProductDetails(match.params.id))
//         }
//     }, [dispatch, product, match])

//     const increment = () => {
//         dispatch({
//             type: "INCREMENT"
//           });
//     }

//     const decrement = () => {
//         dispatch({
//           type: "DECREMENT"
//         });
//       };
//     const addToCartHandler = () => {
//         dispatch(addToCart(product._id, qty))
//         history.push("/cart")
//     }
//     console.log(productDetails)
//     return (
//         <div className="productscreen">
//             {loading ? (<Loading />) : error ? <h2>{error}</h2> : (
//                 <>
//                     <div className="screen_left">
//                         <div className="left_image">
//                             <img src={`http://localhost:3000/assets/imgs/products/${product.thumbnail}`} />
//                         </div>
//                         <div className="left_info">
//                             <p className="left_name">{product.name}</p>
//                             <p>
//                                 Price: <span>{product.price}</span>
//                             </p>
//                             <p>
//                                 Description: {product.desc}
//                             </p>
//                         </div>
//                     </div>
//                     <div className="screen_right">
//                         <div className="right_info">
//                             <p>
//                                 Price: <span>{product.price * qty}</span>
//                             </p>

//                             <div>
//                                 <Button
//                                     size="small"
//                                     disableElevation
//                                     variant="contained"
//                                     value={qty}
//                                     onClick={increment(qty)}
//                                 >
//                                     -
//                                 </Button>
//                                 <input min="1" type="number" placeholder={qty} value={qty} onChange={(i) => setQty(i.target.value)} />
//                                 <Button
//                                     size="small"
//                                     disableElevation
//                                     variant="contained"
//                                     onClick={increment(qty)}
//                                 >
//                                     +
//                                 </Button>
//                             </div>

//                             <button onClick={addToCartHandler} type="button">
//                                 Add to Cart
//                             </button>
//                         </div>
//                     </div>
//                 </>
//             )}

//         </div>
//     )
// }

// const mapStateToProps = state => {
//     return {
//       qty: state.qty
//     };
//   };
  
// export default connect(mapStateToProps)(ProductScreen)

// {/* //         <img src={`http://localhost:3000/assets/imgs/products/${product.thumbnail}`} />
//         // <Card className={classes.root}>
//         //     <h3>Items</h3>
//         //     <di container spacing={2} direction="row" justify="flex-start" alignItems="flex-start" >
//         //         <Grid item xs={4}>
//         //             <Paper className={classes.paper}>
//         //                 <Card className={classes.root} variant="outlined" >
//         //                     <CardMedia style={{ height: "250px", paddingTop: "2%" }}
//         //                         className={classes.media}
//         //                         image={`http://localhost:3000/assets/imgs/products/${product.thumbnail}`}
//         //                         title="Contemplative Reptile"
//         //                     />
//         //                     <CardContent>
//         //                         <Typography color="textSecondary" gutterBottom>
//         //                             {product.name}
//         //                         </Typography>
//         //                         <Typography variant="h5" component="h2">
//         //                             {product.price}
//         //                         </Typography>
//         //                         <Typography className={classes.pos} color="textSecondary">
//         //                             adjective
//         //                         </Typography>
//         //                         <Typography variant="body2" component="p">
//         //                             {product.desc}

//         //                         </Typography>
//         //                     </CardContent>


//         //                     <CardActions>
//         //                         <button type="button">Add to Cart</button>
//         //                     </CardActions>
//         //                 </Card>
//         //             </Paper>
//         //         </Grid>
//         //     </di>

//         //     <ToastContainer />
//         // </Card> */}
