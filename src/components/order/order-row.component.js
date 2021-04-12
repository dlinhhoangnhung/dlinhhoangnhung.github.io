import React, { Component } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"

export default class OrderRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.order._id}</td>
                <td>{this.props.order.customer.name}</td>
                <td>{this.props.order.status}</td>
                <td>{this.props.order.ship_address}</td>
                <td className="btn-group">
                    <Link className="btn btn-sm btn-warning" to={"/edit/order/" + this.props.order._id}>Edit</Link>
                <a href="#" className="btn btn-sm btn-danger" onClick={() => { this.props.deleteOrder(this.props.order._id) }} >Delete</a>
                </td>
            </tr>
        )
    }
}