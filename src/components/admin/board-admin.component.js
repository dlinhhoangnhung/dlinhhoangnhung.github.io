import React, { Component, useState } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
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

import EditProduct from "../product/edit-product.component"
import UpdateOrder from '../order/edit-order.component';
import EditCategory from "../category/edit-category.component"
import EditCustomer from "../customer/edit-customer.component"

import CreateProduct from "../product/create-product.component"
import CreateCategory from "../category/create-category.component"
import CreateOrder from "../order/create-order.component"
import CreateCustomer from "../customer/create-customer.component"

import UserService from "../services/user.service"
import { Redirect } from 'react-router';
import jwt from 'jwt-decode'
// import '../../css/tailwind.css'
import '../../index.css';
import UsersList from './users/users-list.component';
import PrivateSidebar from './sidebar-admin.component';
import SearchBar from '../SearchBar';
import Error from '../screens/errorScreen';

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: undefined,

      home: 0,
      noti: 0,
      items: 0,
      categories: 0,
      orders: 0,
      users: 0,

      isRedirect: 0,
      isAdmin: undefined
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
            isAdmin: 1
          })
          console.log("you are:  " + decoded.role)

        } else {
          this.setState({
            // isRedirect: 1,
            isAdmin: 0
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

    if (isRedirect) return <Redirect to='/login' />
    return (
      this.state.isAdmin === 1 ? (
        <div className="bg-like flex flex-row;">
          {/* <!-- PrivateSide --> */}
          <PrivateSidebar />

          {/* <!-- Get data depend on select --> */}
          <div className="flex flex-col w-4/5 h-full px-8 pt-4">
            <div className="w-full h-10 flex flex-row; justify-between">
              <div className="text-2xl pl-4">
                Organization Overview
              </div>
              <div className="flex flex-row flex space-x-2">
                <div className="h-9 w-20 rounded-md bg-white p-2 flex flex-row;">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-current text-icon" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  <div className="text-black ml-1 text-sm">Filters</div>
                </div>
                <div className="h-9 w-20 rounded-md bg-white p-2 flex flex-row;">
                  <div><img src="img/Slider.png" className="h-5 w-5 stroke-current text-icon" /></div>
                  <div className="text-black ml-1 text-sm">Noti</div>
                </div>
                <div className="h-9 w-20 rounded-md bg-white p-2 flex flex-row;">
                  <div><img src="img/Outbox.png" className="h-5 w-5 stroke-current text-icon" /></div>
                  <div className="text-black ml-1 text-sm">Export</div>
                </div>


              </div>

            </div>


            {/* <div className="bg-table h-full w-full mt-7 rounded-2xl">
          <div className="text-xl flex flex-row; justify-between ring-2 ring-btncreate">
            <div className=" mx-8 my-8">Product Management</div>
            <div className="h9 w-24 ring-1 ring-btncreate p-2 flex flex-row; rounded-md  mx-8 my-8">
              <div><img src="img/Create.png" className="h-5 w-5 stroke-current text-icon" /></div>
              <div className="text-sm">Add New</div>
            </div>
          </div>

          <div className="w-full">
            <div className="flex flex-col text-left">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle min-w-full sm:px-6 lg:px-8">
                  <div className="px-6 shadow overflow-hidden border-b border-gray-200 ">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th scope="col"
                            className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date Created
                          </th>
                          <th scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            #
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 space-x-6">
                        <tr className="hover:bg-gray-200">
                          <td className="px-6 py-4 whitespace-nowrap ">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-3/5 flex flex-row;">
                                <div className="mt-3">
                                  <input type="checkbox" className="form-checkbox" checked />
                                </div>
                                <img className="h-10 w-10 ml-6 mb-2 rounded-md"
                                  src="https://images.unsplash.com/photo-1619914775389-748e5e136c26?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMTk4MjAw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=100"
                                  alt="" />
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    Nida Povey
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    200.000
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 ml-10 whitespace-nowrap">
                            <div className="text-sm text-gray-900">Software engineer</div>
                            <div className="text-sm text-gray-500">IT</div>
                          </td>
                          <td className="px-6 py-4 space-x-4 ">

                            <span
                              className="pl-6 pt-1 inline-flex text-xs leading-5 font-semibold rounded-full  bg-purple-100 text-purple-800 hover:bg-purple-400 w-20 h-7">
                              Edit
                            </span>
                            <span
                              className="pl-6 pt-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-500 hover:bg-blue-400 w-24 h-7">
                              Active
                            </span>
                            <span
                              className="pl-6 pt-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 hover:bg-red-400 w-24 h-7">
                              Delete
                            </span>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-200">
                          <td className="px-6 py-4 whitespace-nowrap ">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-3/5 flex ">
                                <div className="mt-3">
                                  <input type="checkbox" className="form-checkbox" checked />
                                </div>
                                <img className="h-10 w-10 ml-6 mb-2 rounded-md"
                                  src="https://images.unsplash.com/photo-1619914775389-748e5e136c26?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMTk4MjAw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=100"
                                  alt="" />
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    Nida Povey
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    200.000
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 ml-10 whitespace-nowrap">
                            <div className="text-sm text-gray-900">Software engineer</div>
                            <div className="text-sm text-gray-500">IT</div>
                          </td>
                          <td className="px-6 py-4 space-x-4 ">

                            <span
                              className="pl-6 pt-1 inline-flex text-xs leading-5 font-semibold rounded-full  bg-purple-100 text-purple-800 hover:bg-purple-400 w-20 h-7">
                              Edit
                            </span>
                            <span
                              className="pl-6 pt-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-500 hover:bg-blue-400 w-24 h-7">
                              Active
                            </span>
                            <span
                              className="pl-6 pt-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 hover:bg-red-400 w-24 h-7">
                              Delete
                            </span>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-200">
                          <td className="px-6 py-4 whitespace-nowrap ">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-3/5 flex flex-row;">
                                <div className="mt-3">
                                  <input type="checkbox" className="form-checkbox" checked />
                                </div>
                                <img className="h-10 w-10 ml-6 mb-2 rounded-md"
                                  src="https://images.unsplash.com/photo-1619914775389-748e5e136c26?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMTk4MjAw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=100"
                                  alt="" />
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    Nida Povey
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    200.000
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 ml-10 whitespace-nowrap">
                            <div className="text-sm text-gray-900">Software engineer</div>
                            <div className="text-sm text-gray-500">IT</div>
                          </td>
                          <td className="px-6 py-4 space-x-4 ">

                            <span
                              className="pl-6 pt-1 inline-flex text-xs leading-5 font-semibold rounded-full  bg-purple-100 text-purple-800 hover:bg-purple-400 w-20 h-7">
                              Edit
                            </span>
                            <span
                              className="pl-6 pt-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-500 hover:bg-blue-400 w-24 h-7">
                              Active
                            </span>
                            <span
                              className="pl-6 pt-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 hover:bg-red-400 w-24 h-7">
                              Delete
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
          </div>
        </div>
      ) : <Error></Error>
    );
  }
}