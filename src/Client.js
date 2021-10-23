import React, { Component, useState, createContext, useReducer, useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactDOM from 'react-dom'
import axios from "axios"
import { Switch, Route, Link, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./client.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Router } from '@material-ui/icons';
import AuthService from "./components/services/auth.service";

import Loading from "./components/loading.component"
import Navbar from "./components/navbar.component"
import ItemScreen from './components/screens/itemScreen'
import RegisterScreen from './components/screens/registerScreen';
import ProductScreen from './components/screens/productScreen';
import LoginScreen from './components/screens/loginScreen'
import BoardAdmin from './components/admin/board-admin.component';
import ProfileScreen from './components/screens/profileScreen';

import ProductsList from "./components/product/products-list.component"
import OrdersList from "./components/order/orders-list.component"
import CategoriesList from "./components/category/categories-list.component"
import CustomersList from "./components/customer/customers-list.component"
import OrdersDetailList from "./components/orderdetail/ordersdetail-list.component"
import UsersList from "./components/admin/users/users-list.component"

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
// import CartM from './components/cart/CartM';
import Backdrop from './components/Backdrop';
import SideDrawer from './components/Sidedrawer';
import CartScreen from './components/screens/cartScreen';

import Forgot from './components/screens/forgotScreen';
import Reset from './components/screens/resetScreen';
// import { reducer, initialState } from './redux/reducers/userReducers'
import { Badge, Drawer } from '@material-ui/core';
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton';
import CartItem from '../src/components/cart/CartItem'
import PrivateRoute from './components/PrivateRoute';
import CheckoutSteps from './components/checkout/CheckoutSteps';
import CartS from './components/cart/CartS';
// import ShippingAddressScreen from './components/screens/ShippingAddressScreen';
import PaymentMethodScreen from './components/screens/PaymentMethodScreen';
import PlaceOrderScreen from './components/screens/PlaceOrderScreen';
import UserBoard from './components/screens/board-user.component';
import UserOrdersList from './components/users/OrdersList';
import HomeScreen from './components/screens/homeScreen';

export const UserContext = createContext()

const StyledButton = styled(IconButton)`
 position: fixed;
 z-index: 100;
 right: 20px;
 top: 20px;
`
const Routing = () => {
    const history = useHistory()

    return (
        <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route exact path="/items" component={ItemScreen} />\
            {/* <Route exact path={["/items", "/"]} component={HomeScreen} /> */}
            <Route exact path="/items/:name-:id" component={ProductScreen} />
            <Route exact path="/login" component={LoginScreen} />
            <Route exact path="/register" component={RegisterScreen} />
            <Route exact path="/user-profile" component={ProfileScreen} />
            <Route path="/user" component={UserBoard} />
            <Route path="/user/orders" component={UserOrdersList} />
            <Route path="/admin" component={BoardAdmin} />
        
            {/* -------------- ADMIN -------*/}
            <Route path="/products" component={ProductsList} />
            <Route path="/orders" component={OrdersList} />
            <Route path="/categories" component={CategoriesList} />
            <Route path="/customers" component={CustomersList} />
            <Route path="/orders-detail" component={OrdersDetailList} />
            <Route path="/users" component={UsersList} />

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
            <Route path="/cart" component={CartScreen} />
            <Route path="/forgot-password" component={Forgot} />
            <Route path="/reset-password/:token" component={Reset} />
            
            <Route extract path="/cart-test">
                <CartS/>
            </Route>
            {/* <PrivateRoute Route exact path="/shipping" component={ShippingAddressScreen}></PrivateRoute> */}
            {/* <Route path="/payment" component={PaymentMethodScreen} /> */}
            <PrivateRoute Route path="/placeorder" component={PlaceOrderScreen}></PrivateRoute>
             
            <ToastContainer />
        </Switch>

    )
}

function Client() {
    // const [cartOpen, setCartOpen ] = useState(false)
    // const cart = useSelector(state => state.cart)
    // const { cartItems, setCartItems } = cart
    // const getTotalItems = (cart.cartItems[]) => null

    const [sideToggle, setSideToggle] = useState(false);
    // const [state, dispatch] = useReducer(reducer, initialState)
    return (
            <Route>
                {/* <Navbar click={() => setSideToggle(true)} /> */}
                <Routing />
            </Route>
    );
}


export default Client;