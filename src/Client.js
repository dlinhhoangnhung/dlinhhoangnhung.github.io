import React, {
  Component,
  useState,
  createContext,
  useReducer,
  useEffect,
  useContext,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom";
import axios from "axios";
import {
  Switch,
  Route,
  Link,
  useHistory,
  BrowserRouter,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthService from "./components/services/auth.service";
import Loading from "./components/loading.component";
// import Navbar from "./components/navbar.component"
// import ItemScreen from './components/screens/itemScreen'
import RegisterScreen from "./components/screens/registerScreen";
import ProductScreen from "./components/screens/productScreen";
import LoginScreen from "./components/screens/loginScreen";
import BoardAdmin from "./components/admin/board-admin.component";
import ProfileScreen from "./components/screens/profileScreen";

import ProductsList from "./components/product/products-list.component";
import OrdersList from "./components/order/orders-list.component";
import CategoriesList from "./components/category/categories-list.component";
import CustomersList from "./components/customer/customers-list.component";
import UsersList from "./components/admin/users/users-list.component";

import ProductDetail from "./components/product/product.detail.component";
import UserDetail from "./components/admin/users/user-detail.component";
import OrderDetail from "./components/order/order-detail.component";

import EditProduct from "./components/product/edit-product.component";
import UpdateOrder from "./components/order/edit-order.component";
import EditCategory from "./components/category/edit-category.component";
import EditCustomer from "./components/customer/edit-customer.component";
import EditUser from "./components/admin/users/edit-user.component";

import CreateProduct from "./components/product/create-product.component";
import CreateCategory from "./components/category/create-category.component";
import CreateOrder from "./components/order/create-order.component";
import CreateCustomer from "./components/customer/create-customer.component";
// import CartM from './components/cart/CartM';
import Cart from "./components/admin/users/cart.component";

import Forgot from "./components/screens/forgotScreen";
import Reset from "./components/screens/resetScreen";
import ChangeEmail from "./components/admin/users/change-email.component";
// import { reducer, initialState } from './redux/reducers/userReducers'
// import { Badge, Drawer } from '@material-ui/core';
// import styled from 'styled-components'
// import IconButton from '@material-ui/core/IconButton';
import CartItem from "../src/components/cart/CartItem";
import PrivateRoute from "./components/PrivateRoute";
import CheckoutSteps from "./components/checkout/CheckoutSteps";
// import CartS from './components/cart/CartS';
import ShippingAddressScreen from "./components/screens/ShippingAddressScreen";
import PaymentMethodScreen from "./components/screens/PaymentMethodScreen";
import PlaceOrderScreen from "./components/screens/PlaceOrderScreen";
import UserBoard from "./components/screens/board-user.component";
import HomeScreen from "./components/screens/homeScreen";
import PrivateSidebar from "./components/admin/sidebar-admin.component";

import SearchBar from "./components/SearchBar";
import Catalog from "./components/screens/catalogScreen";
import ItemScreen from "./components/screens/itemScreen";
import OrderScreen from "./components/screens/orderScreen";
import UserOrdersList from "./components/screens/orderlistScreen";
import AdminNotify from "./components/admin/admin-notify.component";
import ChangePassword from "./components/admin/users/change-password.component";
import CartScreen from "./components/screens/cartScreen";
import Footer from "./components/Footer";

export const UserContext = createContext();
// const StyledButton = styled(IconButton)`
//  position: fixed;
//  z-index: 100;
//  right: 20px;
//  top: 20px;
// `
const Routing = () => {
  return (
    <div>
      {/* <PrivateSidebar/> */}
      {/* sai css nen k acan */}
      <Switch>
        <Route path='/admin/searchbar' component={SearchBar} />
        <Route path='/items' component={Catalog} />

        <Route exact path='/' component={HomeScreen} />
        <Route exact path='/' component={Footer} />
        {/* <Route exact path="/items" component={ItemScreen} />\ */}
        {/* <Route exact path={["/items", "/"]} component={HomeScreen} /> */}
        <Route exact path='/items/:name-:id' component={ProductScreen} />
        <Route exact path='/login' component={LoginScreen} />
        <Route exact path='/register' component={RegisterScreen} />
        {/* giong ben user detail admin */}
        <Route path='/user-view/user-:id' component={ProfileScreen} />
        <Route path='/user-view/item-:id' component={ItemScreen} />
        <Route path='/user-view/cart' component={CartScreen} />
        <Route path='/user-view/order-:id' component={OrderScreen} />
        <Route path='/user-view/orders-list' component={UserOrdersList} />
        <PrivateRoute
          Route
          exact
          path='/user-info/shipping'
          component={ShippingAddressScreen}
        ></PrivateRoute>
        <PrivateRoute
          Route
          path='/user-info/placeorder'
          component={PlaceOrderScreen}
        ></PrivateRoute>

        <Route path='/user' component={UserBoard} />
        <Route path='/admin' component={BoardAdmin} />

        {/* -------------- ADMIN -------*/}
        <Route path='/admin-notifications' component={AdminNotify} />
        <Route path='/admin-products' component={ProductsList} />
        <Route path='/admin-orders' component={OrdersList} />
        <Route path='/admin-categories' component={CategoriesList} />
        <Route path='/customers' component={CustomersList} />
        <Route path='/admin-users' component={UsersList} />

        <Route path='/admin-view/user/:id' component={UserDetail} />
        <Route path='/admin-view/product/:id' component={ProductDetail} />
        <Route path='/admin-view/order/:id' component={OrderDetail} />

        <Route path='/edit/product/:id' component={EditProduct} />
        <Route path='/admin-view/edit/order/:id' component={UpdateOrder} />
        <Route path='/edit/category/:id' component={EditCategory} />
        <Route path='/edit/customer/:id' component={EditCustomer} />
        <Route path='/edit/user/:id' component={EditUser} />
        <Route path='/create-product' component={CreateProduct} />
        <Route path='/create-category' component={CreateCategory} />
        <Route path='/create-order' component={CreateOrder} />
        <Route path='/create-customer' component={CreateCustomer} />
        <Route path='/user-view/forgot-password' component={Forgot} />
        <Route path='/reset-password/:token' component={Reset} />
        {/* <Route path="/user-view/change-password/:id" component={ChangePassword} />  loi server*/}
        <Route path='/user-view/change-email/:id' component={ChangeEmail} />
        {/* <Route extract path="/cart-test">
                <CartS />
            </Route> */}
        {/* <Route path="/payment" component={PaymentMethodScreen} /> */}

        <ToastContainer />
      </Switch>
    </div>
  );
};

function Client() {
  const history = useHistory();

  // const [cartOpen, setCartOpen ] = useState(false)
  // const cart = useSelector(state => state.cart)
  // const { cartItems, setCartItems } = cart
  // const getTotalItems = (cart.cartItems[]) => null

  const [sideToggle, setSideToggle] = useState(false);
  // const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <BrowserRouter>
      {/* <Route> */}
      <div className='incol space-y-96 bg-catalog'>
        {/* Nvabar */}
        <main>
          <Routing />
        </main>
        <Footer />
      </div>
      {/* </Route> */}
    </BrowserRouter>
  );
}

export default Client;
