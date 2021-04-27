import React, { useState, Component } from 'react'
import ReactDOM from 'react-dom'

import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./client.css";
import "./assets/temp/css/style.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AuthService from "./components/services/auth.service";

import Loading from "./components/loading.component"
import Navbar from "./components/navbar.component"
import Home from './components/public/home/home.component'
import Register from './components/public/register/register.component';
import Login from './components/public/login/login.component'
import BoardUser from './components/public/user/board-user.component'
import BoardAdmin from './components/admin/board-admin.component';
import Profile from './components/public/profile/profile.component';

import ProductsList from "./components/product/products-list.component"
import OrdersList from "./components/order/orders-list.component"
import CategoriesList from "./components/category/categories-list.component"
import CustomersList from "./components/customer/customers-list.component"
import OrdersDetailList from "./components/orderdetail/ordersdetail-list.component"

import EditProduct from "./components/product/edit-product.component"
import EditOrder from "./components/order/edit-order.component"
import EditCategory from "./components/category/edit-category.component"
import EditCustomer from "./components/customer/edit-customer.component"
import EditOrderDetail from "./components/orderdetail/edit-orderdetail.component"

import CreateProduct from "./components/product/create-product.component"
import CreateCategory from "./components/category/create-category.component"
import CreateOrder from "./components/order/create-order.component"
import CreateCustomer from "./components/customer/create-customer.component"
import CreateOrderDetail from "./components/orderdetail/create-orderdetail.component"
import { Router } from '@material-ui/icons';

class Client extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showAdminBoard: false,
            currentUser: undefined,
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                showAdminBoard: user.role.includes("admin"),
            });
        }
    }

    logOut() {
        AuthService.logout();
    }

    render() {

        return (


            // <div className="container mt-3">
      
                <Switch>

                    <Route exact path={["/", "/home"]} component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/user-profile" component={Profile} />
                    <Route path="/user" component={BoardUser} />
                    <Route path="/admin" component={BoardAdmin} />


            /* ---------------------------------- ADMIN --------------------------- */
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
                </Switch>

      
            // </div>

        );
    }
}

export default Client;