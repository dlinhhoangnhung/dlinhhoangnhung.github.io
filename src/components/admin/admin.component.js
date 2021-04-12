// import logo from './logo.svg'
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Navbar from "../navbar.component"
import Sidebar from "../layouts/sidebar.component"

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

export default class Admin extends Component {
  render() {
    return (
      <Router>
        {/* <Navbar /> */}
        <div className="row">
          <div className="col-sm-2">
            <Sidebar />
          </div>

          <div className="col-sm-10">
            <Route path="/products" component={ProductsList} />
            <Route path="/orders" component={OrdersList} />
            <Route path="/categories" component={CategoriesList} />
            <Route path="/customers" component={CustomersList} />
            <Route path="/orders-detail" component={OrdersDetailList} />

            <Route path="/edit/product/:id" component={EditProduct} />
            <Route path="/edit/order/:id" component={EditOrder} />
            <Route path="/edit/category/:id" component={EditCategory} />
            <Route path="/edit/customer/:id" component={EditCustomer} />
            <Route path="/edit/order-detail/:id" component={EditOrderDetail} />

            <Route path="/create-product" component={CreateProduct} />
            <Route path="/create-category" component={CreateCategory} />
            <Route path="/create-order" component={CreateOrder} />
            <Route path="/create-customer" component={CreateCustomer} />
            <Route path="/create-orderdetail" component={CreateOrderDetail} />
            <ToastContainer />
          </div>
        </div>
      </Router>
    );
  }
}
