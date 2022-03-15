import React, { Component } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"

export default class UserOrderRow extends Component {
    render() {
        return (
            <div className="mt-8 py-5 px-6 bg-white h-60 w-full rounded-t-md ring-1 ring-gray-200">
                {
                    <div className="incol space-y-4">
                        <div className="inrow justify-between">
                            <h2 className="">
                                Order <span className='text-indigo-400'>#{this.props.order._id}</span>
                            </h2>
                            <div>Ngày: {this.props.order.createdAt}</div>
                            <div>Số lượng: {this.props.order.orderItems.length}</div>
                        </div>
                        <div onClick={e => window.location.href = '/user-view/order-' + this.props.order._id} className="inrow space-x-52">
                            <div className="inrow">
                                <div className="">
                                    <img src={`./assets/imgs/products/${this.props.order.orderItems[0].thumbnail}`} alt="Model wearing plain white basic tee." class="bg-gray-200 w-40 h-28 rounded-lg " />
                                </div>
                                <div className="ml-5 incol">

                                    <div className='font-semibold'>{this.props.order.orderItems[0].name}</div>
                                    <div>{this.props.order.orderItems[0].price}</div>
                                </div>

                            </div>
                            <div className="incol">
                                <div className="font-semibold">Thông tin vận chuyển:</div>
                                <div>{this.props.order.shippingInfo.address}</div>

                            </div>
                            <div className="incol">
                                {/* <img  alt="Model wearing plain white basic tee." class="bg-gray-150 w-60 h-60 object-center object-cover" /> */}
                                <div className="font-semibold">Liên lạc:</div>
                                <div>{this.props.order.shippingInfo.phone}</div>
                            </div>
                        </div>
                    </div>

                }
            </div>
        )
    }
}