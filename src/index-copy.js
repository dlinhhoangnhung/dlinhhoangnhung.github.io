import React from 'react';
import ReactDOM from 'react-dom';
import './client.css'
import App from './App';
import Client from './Client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"
import store from "./redux/store"
import history from './history';
import { Router, Route, Link } from 'react-router-dom';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      {/* <Router history={history}> */}
        <Client />

      {/* </Router> */}
    </BrowserRouter>,
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
