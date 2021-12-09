import React, { Component } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"
import userService from '../services/user.service'
import Navbar from '../Navbar'

export default class OrderScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            order: {},
            orderid: '',
            process: {},
            shippingInfo: {},
            paymentMethod: '',
            isPaid: undefined,
            isChecked: undefined,
            orderItems: [],
            itemsPrice: 0,
            totalPrice: 0,

            createdAt: ''
        }
    }
    componentDidMount() {
        userService.getOrder(this.props.match.params.id)
            .then(response => {
                this.setState({
                    order: response.data,
                    orderid: response.data._id,
                    process: response.data.process,
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

    whiteSpace(value) {
        var x = value;
        x = x.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        return x
    }

    render() {


        const { orderid, createdAt, order } = this.state
        return (
            <div class="bg-gray-100 h-contain w-full space-y-7 incol ">
                <div class="mr-20 pt-6">
                    <nav aria-label="Breadcrumb">
                        <ol role="list" class="max-w-2xl mx-auto flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8">
                            {/* <li>
                                <div class="flex items-center">
                                    <a href="/user-view/user-:id" class="mr-2 text-sm font-medium text-gray-900">
                                        Dashboard
                                    </a>
                                    <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="w-4 h-5 text-gray-300">
                                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                    </svg>
                                </div>
                            </li> */}

                            <li>
                                <div class="flex items-center">
                                    <a href="/user-view/orders-list" class="mr-2 text-sm font-medium text-gray-900">
                                        Orders List
                                    </a>
                                    <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="w-4 h-5 text-gray-300">
                                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                    </svg>
                                </div>
                            </li>

                            <li class="text-sm">
                                <a href="#" aria-current="page" class="font-medium text-gray-500 hover:text-gray-600">
                                    Order Detail
                                </a>
                            </li>
                        </ol>
                    </nav>

                </div>

                {/* order detail row */}
                <div className="mt-10 w-full px-16 py-8">
                    <div className="inrow justify-between">
                        <h2 className="uppercase">
                            Order <span className="text-base text-indigo-500">#{orderid}</span>
                        </h2>
                        <div>Lúc: {createdAt}</div>
                        <div className=" space-x-1  inrow ">
                            <div className="text-black flex justify-end text-base uppercase">Tổng: </div>
                            <div className=" flex justify-end text-base text-red-800">{order.totalPrice}</div>
                        </div>
                    </div>

                    <div className="py-10 px-11  inrow bg-white h-contain w-full rounded-t-md ring-1 ring-gray-200">
                        <div className="w-2/3">
                            {
                                this.state.orderItems.length > 0 ? this.state.orderItems.map((item) =>
                                    <div className="inrow space-x-52 mb-4">
                                        <div className="inrow">
                                            <div onClick={() => console.log(item.thumbnail)} className="">
                                                <img src={`http://localhost:3000/assets/imgs/products/${item.thumbnail}`} alt="Model wearing plain white basic tee." class="bg-gray-200 w-40 h-38 rounded-lg " />
                                            </div>
                                            <div className="ml-5 incol w-3/10">

                                                <div className="uppercase">{item.name}</div>
                                                <div className="text-red-400 mt-3">{
                                                    window.onload = this.whiteSpace(item.price)
                                                }
                                                </div>
                                                <div><span className="text-base">Màu: </span> <span className="text-base">{item.textColor}</span></div>
                                                <div><span className="text-base">{item.textSize && 'Size:'} </span> <span className="text-base">{item.textSize && item.textSize}</span></div>
                                                <div><span className="text-base">SL: </span> <span className="text-base">{item.qty}</span></div>
                                            </div>

                                        </div>

                                    </div>
                                ) : 'null'
                            }
                        </div>
                        <div className="w-1/2 space-y-3 ">
                            <div className="w-3/4 incol space-y-3">
                                <div className="uppercase">Thông tin:</div>
                                <div className="mt-3 font-bold">Tên khách hàng: </div>
                                <div className="w-3/5 px-2 py-2 text-gray-700 bg-gray-200 rounded">{this.state.shippingInfo.fullName}</div>
                                <div className=" font-bold">Điện thoại: </div>
                                <div className="w-3/5 px-2 py-2 text-gray-700 bg-gray-200 rounded">{this.state.shippingInfo.phone}</div>

                                <div className="font-bold">Địa chỉ: </div>
                                <div className="w-3/5 px-2 py-2 text-gray-700 bg-gray-200 rounded">{this.state.shippingInfo.address}</div>


                            </div>
                            <div className="incol">
                                {/* <img  alt="Model wearing plain white basic tee." class="bg-gray-150 w-60 h-60 object-center object-cover" /> */}
                                <div className="text-indigo-700 ml-16">Thanh toán: {order.paymentMethod}</div>
                            </div>
                        </div>
                    </div>

                    <div className="p-11 bg-white h-30 w-full rounded-b-md ring-1 ring-gray-200">

                        <div className="flex">
                            <div className="w-1/4">
                                <div className="relative mb-2">
                                    <div className="w-10 h-10 mx-auto bg-green-500 rounded-full text-lg text-white flex items-center">
                                        <span className="text-center text-white w-full">
                                            <svg className="w-full fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24}>
                                                <path className="heroicon-ui" d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2zm14 8V5H5v6h14zm0 2H5v6h14v-6zM8 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                                <div className="text-xs text-center md:text-base">Tạo thành công</div>
                            </div>
                            <div className="w-1/4">
                                <div className="relative mb-2">
                                    <div className="absolute flex align-center items-center align-middle content-center" style={{ width: 'calc(100% - 2.5rem - 1rem)', top: '50%', transform: 'translate(-50%, -50%)' }}>
                                        <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                                            <div className={`w-0 bg-green-300 py-1 rounded ${this.state.process.init && 'w-full'}`} />
                                        </div>
                                    </div>
                                    <div className="w-10 h-10 mx-auto bg-green-500 rounded-full text-lg text-white flex items-center">
                                        <span className="text-center text-white w-full">
                                            <svg className="w-full fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24}>
                                                <path className="heroicon-ui" d="M19 10h2a1 1 0 0 1 0 2h-2v2a1 1 0 0 1-2 0v-2h-2a1 1 0 0 1 0-2h2V8a1 1 0 0 1 2 0v2zM9 12A5 5 0 1 1 9 2a5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm8 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h5a5 5 0 0 1 5 5v2z" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                                <div className="text-xs text-center md:text-base">Chờ duyệt</div>
                            </div>
                            <div className="w-1/4">
                                <div className="relative mb-2">
                                    <div className="absolute flex align-center items-center align-middle content-center" style={{ width: 'calc(100% - 2.5rem - 1rem)', top: '50%', transform: 'translate(-50%, -50%)' }}>
                                        <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                                            <div className={`w-0 bg-green-300 py-1 rounded ${this.state.process.processing && 'w-full'}`} />
                                        </div>
                                    </div>
                                    <div className="w-10 h-10 mx-auto bg-white border-2 border-gray-200 rounded-full text-lg text-white flex items-center">
                                        <span className="text-center text-gray-600 w-full">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                                <div className="text-xs text-center md:text-base">Lấy hàng</div>
                            </div>
                            <div className="w-1/4">
                                <div className="relative mb-2">
                                    <div className="absolute flex align-center items-center align-middle content-center" style={{ width: 'calc(100% - 2.5rem - 1rem)', top: '50%', transform: 'translate(-50%, -50%)' }}>
                                        <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                                            <div className={`w-0 bg-green-300 py-1 rounded ${this.state.process.ordering && 'w-full'}`} />
                                        </div>
                                    </div>
                                    <div className="w-10 h-10 mx-auto bg-white border-2 border-gray-200 rounded-full text-lg text-white flex items-center">
                                        <span className="text-center text-gray-600 w-full">
                                            <svg className="w-full fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24}>
                                                <path className="heroicon-ui" d="M9 4.58V4c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v.58a8 8 0 0 1 1.92 1.11l.5-.29a2 2 0 0 1 2.74.73l1 1.74a2 2 0 0 1-.73 2.73l-.5.29a8.06 8.06 0 0 1 0 2.22l.5.3a2 2 0 0 1 .73 2.72l-1 1.74a2 2 0 0 1-2.73.73l-.5-.3A8 8 0 0 1 15 19.43V20a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-.58a8 8 0 0 1-1.92-1.11l-.5.29a2 2 0 0 1-2.74-.73l-1-1.74a2 2 0 0 1 .73-2.73l.5-.29a8.06 8.06 0 0 1 0-2.22l-.5-.3a2 2 0 0 1-.73-2.72l1-1.74a2 2 0 0 1 2.73-.73l.5.3A8 8 0 0 1 9 4.57zM7.88 7.64l-.54.51-1.77-1.02-1 1.74 1.76 1.01-.17.73a6.02 6.02 0 0 0 0 2.78l.17.73-1.76 1.01 1 1.74 1.77-1.02.54.51a6 6 0 0 0 2.4 1.4l.72.2V20h2v-2.04l.71-.2a6 6 0 0 0 2.41-1.4l.54-.51 1.77 1.02 1-1.74-1.76-1.01.17-.73a6.02 6.02 0 0 0 0-2.78l-.17-.73 1.76-1.01-1-1.74-1.77 1.02-.54-.51a6 6 0 0 0-2.4-1.4l-.72-.2V4h-2v2.04l-.71.2a6 6 0 0 0-2.41 1.4zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                                <div className="text-xs text-center md:text-base">Đang vận chuyển</div>
                            </div>
                            <div className="w-1/4">
                                <div className="relative mb-2">
                                    <div className="absolute flex align-center items-center align-middle content-center" style={{ width: 'calc(100% - 2.5rem - 1rem)', top: '50%', transform: 'translate(-50%, -50%)' }}>
                                        <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                                            <div className={`w-0 bg-green-300 py-1 rounded ${this.state.process.shipped && 'w-full'}`} />
                                        </div>
                                    </div>
                                    <div className="w-10 h-10 mx-auto bg-white border-2 border-gray-200 rounded-full text-lg text-white flex items-center">
                                        <span className="text-center text-gray-600 w-full">
                                            <svg className="w-full fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24}>
                                                <path className="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                                <div className="text-xs text-center md:text-base">Hoàn tất</div>
                            </div>
                        </div>
                    </div>
                    <div className="text-red-500 text-right">
                        Lưu ý : Quá trình vận chuyển cần từ 10 - 14 ngày
                    </div>
                </div>
            </div >

        )
    }
}
