import React, { Component } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import Loading from "../loading.component"
import OrderRow from "./order-row.component"

export default class OrdersList extends Component {
    constructor(props) {
        super(props)
        this.deleteOrder = this.deleteOrder.bind(this)
        this.state = { orders: [], isLoading: 1, customers: [] }
    }
    componentDidMount() {
        axios.get('http://localhost:5000/orders')
            .then(response => {
                this.setState({
                    isLoading: 0
                })
                if (response.data.length > 0) {
                    this.setState({
                        orders: response.data,
                    })
                }
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    isLoading: 0
                })
            })


    }

    deleteOrder(id) {
        axios.delete('http://localhost:5000/orders/' + id)
            .then(res => console.log(res.data))
        this.setState({
            orders: this.state.orders.filter(o => o._id !== id)
        })
    }
    ordersList() {
        return this.state.orders.map(currentorder => {
            return <OrderRow order={currentorder} deleteOrder={this.deleteOrder} key={currentorder._id} />
        })
    }


    render() {
        const isLoading = this.state.isLoading
        return (
            <div>
                <h2>Orders List</h2>
                <Link className="nav-item nav-link" to="/create-order">Create Order</Link>

                { isLoading == 0 ?
                    this.state.orders.length > 0 ?
                        <table className="table">
                            <thead className="thead-light">
                                <tr>
                                    <th>ID</th>
                                    <th>Customer Name</th>
                                    <th>Status</th>
                                    <th>Ship Address</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.ordersList()
                                }
                            </tbody>
                        </table> : <p>Data empty</p>
                    : <Loading></Loading>
                }
            </div>
        )
    }
}