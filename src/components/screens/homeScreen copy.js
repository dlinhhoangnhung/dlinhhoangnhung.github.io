import React, { Component, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'

import { ToastContainer } from 'react-toastify';
import Navbar from "../navbar.component"
import Product from "../product/Product";
import UserService from "../services/user.service";
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { ListItem } from "@material-ui/core";
import Loading from "../loading.component";
import { Grid } from '@material-ui/core';
import Backdrop from "../Backdrop";
import Sidedrawer from "../Sidedrawer";
// Actions 
import { getProducts as listProducts } from "../../redux/actions/productAction"

const HomeScreen = () => {
  const dispatch = useDispatch();
  const getProducts = useSelector(state => state.getProducts)
  const { products, loading, error } = getProducts

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <Router>
      {/* <div className="column"> */}
      {/* <Navbar /> */}
      <Grid item container>
        <div className="col-sm-2">
        </div>
        <div className="col-sm-8">
          {
            loading ? (<Loading />) : error ? (<h2>{error}</h2>) :
              (
                products && // lỗi : cannot find the property 'map'....
                products.map((product) => {
                  return <Product key={product._id} productId={product._id}
                    name={product.name}
                    desc={product.desc}
                    price={product.price}
                    thumbnail={product.thumbnail}
                    images={product.images} />
                }))
          }

        </div>
        <div className="col-sm-2">
        </div>
      </Grid>
      {/* </div> */}
      <Loading />
      <ToastContainer />
    </Router>
  );
}

export default HomeScreen


// {
//   loading ? (<Loading />) : error ? (<h2>{error}</h2>) :
//     (
//       products && // lỗi : cannot find the property 'map'....
//       products.map((product) => {
//         return <Product key={product._id} productId={product._id}
//           name={product.name}
//           desc={product.desc}
//           price={product.price}
//           thumbnail={product.thumbnail}
//           images={product.images} />
//       }))
// }