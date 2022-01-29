import React, { Component } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"

export default class OrderRow extends Component {
    render() {
        return (
            <div className="mt-8 py-5 px-6 bg-white h-64 w-full rounded-t-md ring-1 ring-gray-200">
                {
                    <div className='incol h-full'>
                        <div className="incol space-y-4 h-52">
                            <div className="inrow justify-between">
                                <h2 className="">
                                    Order #{this.props.order._id}
                                </h2>
                                <div>Ngay order: {this.props.order.createdAt}</div>
                                <div>So luong san pham: {this.props.order.orderItems.length}</div>
                            </div>
                            <div onClick={e => window.location.href = '/admin-view/order/' + this.props.order._id} className="inrow space-x-52">
                                <div className="inrow">
                                    <div className="">
                                        <img src={`http://localhost:3000/assets/imgs/products/${this.props.order.orderItems[0].thumbnail}`} alt="Model wearing plain white basic tee." class="bg-gray-200 w-40 h-28 rounded-lg " />
                                    </div>
                                    <div className="ml-5 incol">

                                        <div>{this.props.order.orderItems[0].name}</div>
                                        <div>{this.props.order.orderItems[0].price}</div>
                                    </div>

                                </div>
                                <div className="incol">
                                    <div className="">Thông tin vận chuyển:</div>
                                    <div>{this.props.order.shippingInfo.address}</div>

                                </div>
                                <div className="incol">
                                    {/* <img  alt="Model wearing plain white basic tee." class="bg-gray-150 w-60 h-60 object-center object-cover" /> */}
                                    <div className="">Liên lạc:</div>
                                    <div>{this.props.order.shippingInfo.phone}</div>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={e => window.location.href = '/admin-view/edit/order/' + this.props.order._id}
                            type="button" class="w-14 py-2.5 bg-yellow-500 text-white pr-1 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-600 hover:shadow-lg focus:bg-yellow-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-700 active:shadow-lg transition duration-150 ease-in-out">
                            Sửa
                        </button>
                    </div>
                }
            </div>
            // <tr className="hover:bg-gray-200">
            //     <td className="px-6 py-4 whitespace-nowrap">
            //         <div className="flex items-center">
            //             <span
            //                 onClick={() => { this.props.deleteProduct(this.props.order._id) }}
            //             >
            //                 <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 stroke-current stroke-1 text-red-400 hover:text-red-800 " viewBox="0 0 20 20" fill="currentColor">
            //                     <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
            //                 </svg>
            //             </span>

            //             <div onClick={e => window.location.href = '/admin-view/order/' + this.props.order._id} className="flex-shrink-0 h-10 w-3/5 flex ">
            //                 <img className="h-10 w-10 ml-6 mb-2 rounded-md"
            //                     src="https://images.unsplash.com/photo-1619914775389-748e5e136c26?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218fHx8fHx8fHwxNjIwMTk4MjAw&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=100"
            //                     alt="" />
            //                 <div className="ml-4">
            //                     <div className="text-sm font-medium text-gray-900">
            //                         Order ID: {this.props.order._id}
            //                     </div>
            //                     <div className="text-sm text-gray-500">
            //                         Total: {this.props.order.totalPrice}
            //                     </div>
            //                 </div>
            //             </div>
            //         </div>
            //     </td>
            //     <td className="px-6 py-4 ml-10 whitespace-nowrap">
            //         <div className="text-sm text-gray-900">Software engineer</div>
            //         <div className="text-sm text-gray-500">IT</div>
            //     </td>
            //     <td className="px-6 py-4 space-x-4 ">
            //         <Link to={"/edit/order/" + this.props.order._id}>
            //             <span
            //                 className="pl-6 pt-1 inline-flex text-xs leading-5 font-semibold rounded-full  bg-purple-100 text-purple-800 hover:bg-purple-400 w-20 h-7">
            //                 Edit
            //             </span>
            //         </Link>

            //         <span
            //             className="pl-6 pt-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-500 hover:bg-blue-400 w-24 h-7">
            //             Details
            //         </span>
            //     </td>
            // </tr>
        )
    }
}