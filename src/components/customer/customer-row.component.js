import React, { Component } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"

export default class CustomerRow extends Component {
    render(){
        return (
            <tr>
                <td>{this.props.customer._id}</td>   
                <td>{this.props.customer.insta}</td>
                <td>{this.props.customer.name}</td>               
                <td>{this.props.customer.phone}</td>
                <td>{this.props.customer.address}</td>
                <td className="btn-group">
                    <Link className="btn btn-sm btn-warning" to={"/edit/customer/" + this.props.customer._id}>Edit</Link> 
            <a className="btn btn-sm btn-danger" href="#" onClick={() => { this.props.deleteCustomer(this.props.customer._id) }} >Delete</a>
                </td>
            </tr>
        )
    }
}