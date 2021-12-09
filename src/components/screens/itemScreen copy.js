// import React, { Component, useEffect, useState } from "react";
// import { useDispatch, useSelector } from 'react-redux'

// import { ToastContainer } from 'react-toastify';
// import Navbar from "../navbar.component"
// import Product from "../product/Product";
// import UserService from "../services/user.service";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom"
// import { ListItem } from "@material-ui/core";
// import Loading from "../loading.component";
// import { Grid } from '@material-ui/core';
// import Backdrop from "../Backdrop";
// import Sidedrawer from "../Sidedrawer";
// // Actions 
// import { getProducts as listProducts } from "../../redux/actions/productAction"
// import { Container, Row, Col, Box } from "reactstrap";
// import { chunk } from 'lodash'
// import userService from "../services/user.service";

// import { EatLoading } from 'react-loadingg';
// import LinearProgress from '@material-ui/core/LinearProgress';

// const ItemScreen = () => {
//   const dispatch = useDispatch();
//   const getProducts = useSelector(state => state.getProducts)
//   const { products, loading, error } = getProducts
//   useEffect(() => {
//     dispatch(listProducts());
//   }, [dispatch]);
//   console.log(products)
//   //   const chunkSize = 1 
//   //   const cache = [] 
//   //   if (chunkSize <= 0) {
//   //     return cache
//   //   }
//   //   while (listProducts.length){
//   //     cache.push(listProducts.splice(0, chunkSize))
//   //   } 
//   //   return cache

//   // const productsChunks = chunk(products, 3);

//   // const rows =()=> productsChunks.map((productChunk, index) => {
//   //   const productsCols = productChunk.map((product, index) => {
//   //     return (
//   //       <Col xs="4" key={product.id}>
//   //         <Product key={product._id} productId={product._id}
//   //           name={product.name}
//   //           desc={product.desc}
//   //           price={product.price}
//   //           thumbnail={product.thumbnail}
//   //           images={product.images} />
//   //       </Col>
//   //     );
//   //   });
//   //   return <Row key={index}>{productsCols}</Row>
//   // });
//   return (
//     <Router>
//       {/* <div className="column"> */}
//       {/* <Navbar /> */}
//       <Grid item container>
//         <div className="col-sm-1">
//         </div>
//         <div className="col-sm-10">
//           {/* <h3>Items</h3> */}
//           <div className="products">
//             {
//               loading ? (<Loading />) : error ? (<h2>{error}</h2>) :
//                 (
//                   products && // lỗi : cannot find the property 'map'....
//                   products.map((product) => {
//                     return <Product key={product._id} productId={product._id}
//                       name={product.name}
//                       desc={product.desc}
//                       price={product.price}
//                       thumbnail={product.thumbnail}
//                       images={product.images}
//                       cateId={product.cateid} />
//                   }))
//             }
//           </div>
//         </div>
//         <div className="col-sm-1">
//         </div>
//       </Grid>
//       {/* </div> */}
//       {/* <Loading /> */}
//       <ToastContainer />
//     </Router>
//   );
// }

// export default ItemScreen


// // {
// //   loading ? (<Loading />) : error ? (<h2>{error}</h2>) :
// //     (
// //       products && // lỗi : cannot find the property 'map'....
// //       products.map((product) => {
// //         return <Product key={product._id} productId={product._id}
// //           name={product.name}
// //           desc={product.desc}
// //           price={product.price}
// //           thumbnail={product.thumbnail}
// //           images={product.images} />
// //       }))
// // }