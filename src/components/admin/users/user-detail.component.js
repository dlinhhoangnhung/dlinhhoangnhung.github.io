import React, { Component } from 'react'
import userService from '../../services/user.service'
import Loading from '../../loading.component'
import PrivateSidebar from "../sidebar-admin.component"
import axios from 'axios'
import authHeader from '../../services/auth-header'
import ItemRow from './item-row.component'
import { cover } from '../../../assets/img/clouds_from_my_neighbor_totoro_by_itsendy_deb7t16-fullview.jpg'
import UserPrivateSidebar from './sidebar-user-private.component'

export default class ProductDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {},
            userid: '',
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            orderslist: '',
            role: '',
            address: '',
            phone: '',
            isLoading: 1,


            shippingInfo: {},


            paymentMethod: "",
            isPaid: undefined,
            isDelivered: false,
            orderid: "",

            orderslist: [],
            orderItems: [],
            orderid: "",

            itemsPrice: 0,
            totalPrice: 0,
            userid: "",

            process: {},
            init: undefined,
            foreign: undefined,
            transport: undefined,
            complete: undefined,

            isCheck: undefined
        }
    }

    componentDidMount() {
        userService.getOneUserAdmin(this.props.match.params.id)
            .then(response => {
                this.setState({
                    user: response.data,
                    userid: response.data._id,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    username: response.data.username,
                    email: response.data.email,
                    role: response.data.role,
                    address: response.data.address,
                    phone: response.data.phone,

                    isLoading: 0
                })
                console.log('object')
                console.log('response.data' + response.data)
            })
            .catch(err => {
                console.log(err);
            })

        userService.getOrdersbyUserId(this.props.match.params.id)
            .then(response => {
                this.setState({
                    orderslist: response.data,
                    shippingInfo: response.data.shippingInfo,


                    paymentMethod: response.data.paymentMethod,
                    isPaid: response.data.isPaid,
                    isCheck: response.data.isCheck,
                    orderid: response.data._id,

                    orderItems: response.data.orderItems,

                    itemsPrice: response.data.itemsPrice,
                    totalPrice: response.data.totalPrice,
                    userid: response.data.userid,
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        const { firstName, lastName, username, orderslist, email, isLoading, productname, shippingInfo, address, phone, user } = this.state
        let orders = this.state.orderslist.map(function (order) {
            return { order };
        })
        return (
            <div className="bg-like flex flex-row">
                <UserPrivateSidebar user={user} />

                <div class="px-16 py-5 bg-white  rounded-lg w-full overflow-hidden">
                    <div class="relative">
                        <canvas class="w-full bg-gray-300 h-60" width="940" height="352"></canvas>
                        <div class="mb-8 -ml-13 w-full absolute bottom-0 left-0 z-10 transform translate-y-3/4 lg:w-auto lg:translate-x-1/2 flex justify-center">
                            <div onClick={() => console.log('edit avatar')} className="w-11 h-11 rounded-full absolute bg-gray-100 bg-opacity-95 ml-16 mt-20 p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute stroke-current text-black text-opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </div>
                            <canvas onClick={() => console.log('edit avatar')} class="bg-gray-400 rounded-full" width="120" height="120">
                            </canvas>
                        </div>
                    </div>



                    <div class="bg-gray-100 h-38 pt-[120px] lg:pt-0 lg:pl-[240px] min-h-[120px]">
                        <div class="p-4 ml-48 text-center lg:text-left">
                            <h1 class="font-mock text-2xl text-gray-700 mb-4">{firstName} {lastName}</h1>
                        </div>
                    </div>

                    <div className="space-y-0.5">
                        <div class="justify-between px-12 bg-gray-100 mt-14 w-full font-mock px-5 py-8 text-black inrow">
                            <div>
                                Information
                            </div>
                            <div className="mr-10 inrow space-x-1">
                                <div>Edit Profile</div>
                                <div><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg></div>
                            </div>
                        </div>

                        {/* USer edit profile o day */}
                        <form>
                            <div>
                                <div class="pl-28 inrow  bg-gray-100 w-full font-mock px-5 py-8 text-black">
                                    <div class="col-span-6 sm:col-span-3">
                                        <label for="first-name" class="block text-sm font-medium text-gray-700">Username</label>
                                        <input type="text" value={username} id="first-name" autocomplete="given-name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-gray-300 rounded-md" />
                                    </div>
                                    <div class="col-span-6 ml-48 sm:col-span-3">
                                        <div>
                                            <label for="first-name" class="block text-sm font-medium text-gray-700">Phone</label>
                                            <input type="text" value={phone} id="first-name" autocomplete="given-name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-gray-300 rounded-md" />
                                        </div>
                                    </div>

                                </div>
                                <div class="pl-28 inrow  bg-gray-100 w-full font-mock px-5 py-8 text-black">
                                    <div class="col-span-6 sm:col-span-3">
                                        <div className="incol space-x-3">
                                            <div>
                                                <label for="first-name" class="block text-sm font-medium text-gray-700">Password</label>

                                                <input type="text" value="****" id="first-name" autocomplete="given-name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-gray-300 rounded-md" />

                                            </div>
                                            <div className=" text-blue-900 text-sm mr-9">
                                                Change Password
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-span-6 ml-48 sm:col-span-3">
                                        <div>
                                            <label for="first-name" class="block text-sm font-medium text-gray-700">Address</label>
                                            <input type="text" value={address} id="first-name" autocomplete="given-name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-gray-300 rounded-md" />
                                        </div>
                                    </div>

                                </div>
                                <div class="pl-28 inrow justify-between bg-gray-100 w-full font-mock px-5 py-8 text-black">
                                    <div class="col-span-6 sm:col-span-3">
                                        <div className="incol space-x-3">
                                            <div>
b                                               <label for="first-name" class="block text-sm font-medium text-gray-700">Email</label>

                                                <input type="text"
                                                    value={
                                                        email.replace(/(.{3})(.*)(?=@)/,
                                                            function (gp1, gp2, gp3) {
                                                                for (let i = 0; i < gp3.length; i++) {
                                                                    gp2 += "*";
                                                                } return gp2;
                                                            })
                                                    } id="first-name" autocomplete="given-name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-gray-300 rounded-md" />

                                            </div>
                                            <a href={`/change-email/` + user._id}  className="text-blue-900 mr-10 text-sm">
                                                Change Email
                                            </a>
                                        </div>
                                    </div>


                                </div>

                            </div>
                        </form>
                    </div>
                </div>

            </div>
        )
    }

}




