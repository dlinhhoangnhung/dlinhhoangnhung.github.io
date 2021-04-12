import React, { Component } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"
export default class OrderDetailRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.order_detail._id}</td>
                <td>{this.props.order_detail.order._id}</td>
                <td>{this.props.order_detail.product.name}</td>
                <td>{this.props.order_detail.quantity}</td>
                <td>{this.props.order_detail.price}</td>
                <td className="btn-group">
                    <Link className="btn btn-sm btn-warning" to={"/edit/order-detail/" + this.props.order_detail._id}>Edit</Link>
                <a href="#" className="btn btn-sm btn-danger" onClick={() => { this.props.deleteOrderDetail(this.props.order_detail._id) }} >Delete</a>
                </td>
            </tr>
        )
    }
}