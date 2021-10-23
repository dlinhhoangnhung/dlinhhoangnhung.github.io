import React, { Component, useState } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
// import "bootstrap/dist/css/bootstrap.min.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"

import AuthService from "../services/auth.service"
import Navbar from "../navbar.component"
import Sidebar from "../layouts/sidebar.component"
import Loading from "../loading.component"
import Warning from "../warning.component"

import ProductsList from "../product/products-list.component"
import OrdersList from "../order/orders-list.component"
import CategoriesList from "../category/categories-list.component"
import CustomersList from "../customer/customers-list.component"
import OrdersDetailList from "../orderdetail/ordersdetail-list.component"

import EditProduct from "../product/edit-product.component"
import EditOrder from "../order/edit-order.component"
import EditCategory from "../category/edit-category.component"
import EditCustomer from "../customer/edit-customer.component"
import EditOrderDetail from "../orderdetail/edit-orderdetail.component"

import CreateProduct from "../product/create-product.component"
import CreateCategory from "../category/create-category.component"
import CreateOrder from "../order/create-order.component"
import CreateCustomer from "../customer/create-customer.component"
import CreateOrderDetail from "../orderdetail/create-orderdetail.component"

import UserService from "../services/user.service"
import { Redirect } from 'react-router';
import jwt from 'jwt-decode'

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: undefined,

      isRedirect: 0
    };
  }

  componentDidMount() {
    // Cach kiem tra role trong LocalStorage de quan ly
    const user = AuthService.getCurrentUser()

    if (!user) {
      this.setState({
        isRedirect: 1
      })
    } else {
      let decoded = jwt(user.token); // decode your token here
      const show = JSON.stringify(decoded)
      console.log("decode :" + show)
      if (!user.token) { // fake token
        this.setState({
          isRedirect: 1
        })
      }
      else {
        if (decoded.role == "admin") {
          this.setState({
            isRedirect: 0
          })
          console.log("you are:  " + decoded.role)

        } else {
          this.setState({
            isRedirect: 1
          })
          console.log("you are:  " + decoded.role)
        }
      }
    }
    // Cach AuthService.getAdminBoard match voi status cua server de quan ly nhung khong hoat dong
    // .then(response => {
    //   if (response.status === 200) { // ADMIN
    //     // this.setState({
    //     //   message: response.data.message,
    //     //   isRedirect: 0
    //     // }, function () { console.log(this.state.isRedirect) 
    //     // }
    //     // );
    //     const [isRedirect, setValue] = useState("");
    //     setValue(0);
    //     setValue((state) => {
    //       console.log(state); // "React is awesome!"

    //       return state;
    //     });

    //     console.log('ddaay la 200')
    //   }
    //   else if (response.status === 400 && response.status == 403) { // USER OR VISITOR
    //     // this.setState({
    //     //   message: response.data.message,
    //     //   isRedirect: 1
    //     // }, function () {
    //     //   console.log(this.state.isRedirect)
    //     // });
    //     const [isRedirect, setValue] = useState("");
    //     setValue(1);
    //     setValue((state) => {
    //       console.log(state); // "React is awesome!"

    //       return state;
    //     });

    //     console.log('ddaay la 400 va 403')

    //   }
    // }
    //   // ,
    //   // error => { // CANOT GET DATA
    //   //   this.setState({
    //   //     content:
    //   //       (error.response &&
    //   //         error.response.data &&
    //   //         error.response.data.message) ||
    //   //       error.message ||
    //   //       error.toString()
    //   //   });
    //   // }
    // ).catch(error => { // CANOT GET DATA
    //   this.setState({
    //     content:
    //       (error.response &&
    //         error.response.data &&
    //         error.response.data.message) ||
    //       error.message ||
    //       error.toString()
    //   });
    // })
  }

  // componentWillUnmount() {
  //   // fix Warning: Can't perform a React state update on an unmounted component
  //   this.setState = (state, callback) => {
  //     return;
  //   };
  // }

  render() {
    const { isRedirect } = this.state
    console.log('--')
    console.log(this.state.isRedirect)

    if (isRedirect) return <Redirect to='/' />
    return (
      <Router>
        <div className="row">
          <div className="col-sm-2">
            <Sidebar />
          </div>
          <ToastContainer />
        </div>
      </Router>
    );
  }
}