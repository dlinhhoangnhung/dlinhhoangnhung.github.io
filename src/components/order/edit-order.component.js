import React, { Component } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from 'react-router'
import userService from "../services/user.service";
import authHeader from "../services/auth-header";

export default class UpdateOrder extends Component {
    constructor(props) {
        super(props)

        this.onChangeShipAddress = this.onChangeShipAddress.bind(this)
        this.onChangeProcess = this.onChangeProcess.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            order: {},
            orderid: '',
            status: '',

            init: true,
            processing: false,
            ordering: false,
            shipped: false,
            delivered: false,

            shippingInfo: {},
            paymentMethod: '',
            isPaid: undefined,
            isChecked: undefined,
            orderItems: [],
            itemsPrice: 0,
            totalPrice: 0,

            createdAt: '',

            isRedirect: 0
        }
    }

    componentDidMount() {
        userService.getOrder(this.props.match.params.id)
            .then(response => {
                this.setState({
                    order: response.data,
                    orderid: response.data._id,
                    status: response.data.status,
                    shippingInfo: response.data.shippingInfo,
                    paymentMethod: response.data.paymentMethod,
                    isPaid: response.data.isPaid,
                    isChecked: response.data.isChecked,
                    orderItems: response.data.orderItems,
                    itemsPrice: response.data.itemsPrice,
                    totalPrice: response.data.totalPrice,
                    createdAt: response.data.createdAt

                })
                console.log(response.data)
            })
            .catch(err => {
                console.log(err);
            })
    }


    onChangeProcess(o) {
        console.log(o.target.value);
        const index = o.target.value
        if (index == 0) {
            this.setState({
                status: 'Tạo thành công'
            })
        }
        if (index == 1) {
            this.setState({
                status: 'Đã được duyệt'
            })
        }
        if (index == 2) {
            this.setState({
                status: 'Đang lấy hàng'
            })
        }
        if (index == 3) {
            this.setState({
                status: 'Đang vận chuyển'
            })
        }
        if (index == 4) {
            this.setState({
                status: 'Giao hàng thành công'
            })
        }
        if (index == -1) {
            this.setState({
                status: 'Giao hàng không thành công'
            })
        }
    }



    onChangeShipAddress(o) {
        this.setState({
            ship_address: o.target.value
        })
    }


    onSubmit(o) {
        o.preventDefault()


        console.log(this.state.status);
        const data = {
            status: this.state.status
        }

        userService.updateOrderProcess(this.props.match.params.id, data)
            .then(res => {
                console.log(res.data)
                toast("Update successfully :)", {
                    type: "warning"
                })
                this.setState({
                    isRedirect: 1
                })
            }
                ,
                error => {
                    console.log(error);
                })


    }
    render() {
        if (this.state.isRedirect) return <Redirect to='/admin-orders' />
        return (
            <div>
                <form onSubmit={this.onSubmit}>



                    <div class="bg-gray-100 h-screen w-full space-y-7">
                        <div class="pt-6">
                            <nav aria-label="Breadcrumb">
                                <ol role="list" class="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8">
                                    <li>
                                        <div class="flex items-center">
                                            <a href="/admin" class="mr-2 text-sm font-medium text-gray-900">
                                                Dashboard
                                            </a>
                                            <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="w-4 h-5 text-gray-300">
                                                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                            </svg>
                                        </div>
                                    </li>

                                    <li>
                                        <div class="flex items-center">
                                            <a href="/admin-orders" class="mr-2 text-sm font-medium text-gray-900">
                                                Orders List
                                            </a>
                                            <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="w-4 h-5 text-gray-300">
                                                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                            </svg>
                                        </div>
                                    </li>

                                    <li class="text-sm">
                                        <a href="#" aria-current="page" class="font-medium text-gray-500 hover:text-gray-600">
                                            {this.state.orderid}
                                        </a>
                                    </li>
                                </ol>
                            </nav>

                        </div>

                        {/* order detail row */}
                        <div className="h-full w-full px-16 py-8">
                            <div className="inrow justify-between">
                                <h2 className="">
                                    Order #{this.state.orderid}
                                </h2>
                                <div>Ngay order: {this.state.createdAt}</div>
                                <div>So luong san pham: {this.state.orderItems.length}</div>
                            </div>

                            <div className="mt-8 p-11 bg-white h-44 w-full rounded-t-md ring-1 ring-gray-200">
                                {
                                    this.state.orderItems.length > 0 ? this.state.orderItems.map((item) =>
                                        <div className="inrow space-x-52">
                                            <div className="inrow">
                                                {/* <div onClick={() => console.log(item.thumbnail)} className="">
                                                    <img src={`./assets/imgs/products/${item.thumbnail}`} alt="Model wearing plain white basic tee." class="bg-gray-200 w-40 h-40 rounded-lg " />
                                                </div> */}
                                                <div className="ml-5 incol">

                                                    <div>{item.name}</div>
                                                    <div>{item.price}</div>
                                                </div>

                                            </div>

                                        </div>
                                    ) : 'null'
                                }
                                <div className="incol">
                                    <div className="">Thông tin vận chuyển:</div>
                                    <div>{this.state.shippingInfo.address}</div>

                                </div>
                                <div className="incol">
                                    {/* <img  alt="Model wearing plain white basic tee." class="bg-gray-150 w-60 h-60 object-center object-cover" /> */}
                                    <div className="">Liên lạc:</div>
                                    <div>{this.state.shippingInfo.phone}</div>
                                </div>

                                <span class="text-gray-700">Trạng thái hiện tại: </span>
                                <span class="text-indigo-700">{this.state.status}</span>
                                <label class="block">
                                    <span class="text-gray-700">Select</span>

                                    <select required onChange={this.onChangeProcess} class="form-select block w-full mt-1">
                                        <option value={0} >Tạo thành công</option>
                                        <option value={1} >Duyệt</option>
                                        <option value={2} >Đang lấy hàng</option>
                                        <option value={3} >Đang vận chuyển</option>
                                        <option value={4} >Hoàn tất</option>
                                        <option value={5} >Giao không thành công</option>
                                    </select>
                                </label>
                            </div>

                            <div className="flex justify-end pr-4 pt-4">
                                <button type="submit" class="px-6 py-2.5 bg-yellow-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-600 hover:shadow-lg focus:bg-yellow-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-700 active:shadow-lg transition duration-150 ease-in-out">
                                    Warning
                                </button>
                            </div>

                        </div>
                    </div >
                </form>

            </div>
        )
    }
}