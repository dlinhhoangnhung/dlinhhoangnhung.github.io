import React, { Component } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"

// const Customer = props => props.customer.name
export default class OrderRow extends Component {
    constructor(props) {
        super(props)
        this.state = { customer: {} }
    }
    componentDidMount() {
        axios.get('http://localhost:5000/customers/' + this.props.order.cusid)
            .then(response => {
                this.setState({
                  customer : response.data
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
    render() {
        return (
            <tr>
                <td>{this.props.order._id}</td>
                <td>{this.state.customer.name}</td>
                <td>{this.props.order.status}</td>
                <td>{this.props.order.ship_address}</td>
                <td>
                    <Link to={"/edit/order/" + this.props.order._id}>Edit</Link> |
                <a href="#" onClick={() => { this.props.deleteOrder(this.props.order._id) }} >Delete</a>
                </td>
            </tr>
        )
    }
}