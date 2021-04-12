import React, { Component } from 'react'
import { Link } from "react-router-dom"

export default class ProductRow extends Component {
    shouldComponentUpdate(nextProps) {
        return nextProps !== this.props;
    }

    render() {
        return (
            <tr>
                <td>{this.props.product._id}</td>
                <td>{this.props.product.name}</td>
                <td className="btn-group"> 
                    <Link className="btn btn-sm btn-warning" to={"/edit/product/" + this.props.product._id}>Edit</Link> 
            <a className="btn btn-sm btn-danger" href="#" onClick={() => { this.props.deleteProduct(this.props.product._id) }} >Delete</a>
                </td>
            </tr>
        )
    }
}