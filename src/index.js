import React from 'react';
import ReactDOM from 'react-dom';
import Client from './Client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"
import store from "./redux/store"
import history from './history';
import { Router, Route, Link } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import './index.css';
// Reducers
import { cartReducer } from './redux/reducers/cartReducers';
import { getProductDetailsReducer, getProductsReducer } from './redux/reducers/productReducers';
import { getUserSigninReducer } from './redux/reducers/userReducers'

ReactDOM.render(
  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={PersistGate}> */}
    <BrowserRouter>
      <Router history={history}>

        <Client />

      </Router>
    </BrowserRouter>
    {/* </PersistGate> */}


  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
