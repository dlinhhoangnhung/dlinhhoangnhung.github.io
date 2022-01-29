import { useDispatch, useSelector } from 'react-redux'
import React, { Component, useEffect, useState } from "react";
import authService from '../../services/auth.service';
import G from '../../../assets/G.png'
import CartScreen from '../../screens/cartScreen';
import { removeFromCart, adjustQty, increaseItem, decreaseItem, decreaseQty, increaseQty } from "../../../redux/actions/cartActions"
import Cart from './cart.component';
import sample from '../../../assets/img/clouds_from_my_neighbor_totoro_by_itsendy_deb7t16-fullview.jpg'
import axios from 'axios'
import authHeader from '../../services/auth-header';
import { toast } from "react-toastify";

const NavbarUser = () => {
    const userInfo = authService.getCurrentUser()
    const [onUser, setOnUser] = useState(0);
    const catchUserIcon = () => {
        setOnUser(!onUser)
    }
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    const getCartCount = () => {
        return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0)
    }
    const [showCart, setShowCart] = useState(0)

    const cartEvent = () => {  // switch the value of the showModal state
        setShowCart(!showCart)
    }

    return (
        <div className="w-full h-10 flex flex-row; justify-between">
            <div className="text-2xl pl-4">
                User Overview
            </div>
            <div className="flex flex-row flex space-x-12">
                <div onClick={() => { cartEvent() }} >
                    <div className="inrow">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <span className="text-bold text-blue-500">{getCartCount()}</span>
                    </div>
                    {!showCart ? '' : (<Cart />)}
                </div>


                {/* <div className="group relative usericon">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div class="usericon-menu top-0 absolute hidden  w-36 rounded-md shadow-lg top-7 bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                        <ul class="block w-full bg-white shadowdivide-y divide-gray-100">
                            <li class="py-1"><a class="block text-gray-700 font-bold text-base uppercase hover:text-purple-700 px-4 py-2 text-sm">Item</a></li>
                            <li class="py-1"><a class="block text-gray-700 font-bold text-base uppercase hover:text-purple-700 px-4 py-2 text-sm">Item 2</a></li>
                        </ul>
                    </div>
                </div> */}

                <div onClick={() => { catchUserIcon() }} className="group relative ">
                    <div className='inrow space-x-2'>
                        {/* <div>Xin chào,</div> */}
                        <div class="">
                            {/* {
                                userInfo.avatar && (userInfo.avatar ?
                                    (
                                        <img src={`http://localhost:3000/assets/imgs/users/${userInfo.avatar}`} className="inline-block h-10 w-10 rounded-full ring-2 ring-white" />
                                    ) : <img src={sample} className="inline-block h-10 w-10 rounded-full ring-2 ring-white" />)
                            } */}
                        </div>
                        <span className='font-semibold mb-4'>
                            Chào {userInfo ? userInfo.username : null}
                        </span>
                    </div>
                    <div className={` usericon-menu top-0 absolute ${onUser === true ? '' : 'hidden'}  w-44 rounded-md shadow-lg top-10 right-0 bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none`}>
                        <ul class="block w-full bg-white shadowdivide-y divide-gray-100">
                            {
                                userInfo ? (
                                    <div className="z-40">
                                        <li onClick={() => { authService.logout() }} class="py-1"><a class="block text-gray-700 font-bold text-base uppercase hover:text-purple-700 px-4 py-2 text-sm">Đăng xuất</a></li></div>
                                )
                                    : (<div>
                                        <li onClick={e => window.location.href = '/login'} class="py-1"><a class="block text-gray-700 font-bold text-base uppercase hover:text-purple-700 px-4 py-2 text-sm">Đăng Nhập</a></li>
                                        <li onClick={e => window.location.href = '/register'} class="py-1"><a class="block text-gray-700 font-bold text-base uppercase hover:text-purple-700 px-4 py-2 text-sm">Đăng ký</a></li>
                                    </div>)
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavbarUser
