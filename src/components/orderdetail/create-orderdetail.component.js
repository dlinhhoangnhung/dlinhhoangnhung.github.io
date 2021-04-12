import React, { Component } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { Redirect } from 'react-router'

export default class CreateOrderDetail extends Component {
    constructor(props) {
        super(props)

        this.onChangeOrderId = this.onChangeOrderId.bind(this)
        this.onChangeProductId = this.onChangeProductId.bind(this)
        this.onChangeQuantity = this.onChangeQuantity.bind(this)
        this.onChangePrice = this.onChangePrice.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            orderid: '',
            productid: '111',
            quantity: 2,
            price: 2133333,

            orders: [],
            products: [],
            isRedirect: 0
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5001/orders')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        orders: response.data,
                        orderid: response.data[0]._id
                    })
                }
            })

        axios.get('http://localhost:5001/products')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        products: response.data,
                        productid: response.data[0]._id
                    })
                }
            })
    }

    onChangeOrderId(o) {
        this.setState({
            orderid: o.target.value
        })
    }

    onChangeProductId(o) {
        this.setState({
            productid: o.target.value
        })
    }

    onChangeQuantity(o) {
        this.setState({
            quantity: o.target.value
        })
    }

    onChangePrice(o) {
        this.setState({
            price: o.target.value
        })
    }

    onSubmit(o) {
        o.preventDefault()
        const order_detail = {
            orderid: this.state.orderid,
            productid: this.state.productid,
            quantity: this.state.quantity,
            price: this.state.price
        }
        console.log(order_detail)

        axios.post('http://localhost:5001/orders-detail/add', order_detail)
            .then(res => {
                console.log(res.data)                                                      
                toast("Add successfully !", {
                    type: "warning"
                })
                this.setState({
                    isRedirect: 1
                })
            })
    }

    render() {
        if (this.state.isRedirect) return <Redirect to='/orders-detail' />
        return (
            <div>
                <h3>Create Order Detail</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Order ID: </label>
                        <select
                            required
                            className="form-control"
                            value={this.state.orderid}
                            onChange={this.onChangeOrderId}>
                            {
                                this.state.orders.map(function (order) {
                                    return <option key={order._id} value={order._id}>
                                        {order._id}
                                    </option>
                                })
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Choose Product: </label>
                        <select
                            required
                            className="form-control"
                            value={this.state.productid}
                            onChange={this.onChangeProductId}>
                            {
                                this.state.products.map(function (product) {
                                    return <option key={product._id} value={product._id}>
                                        {product.name}
                                    </option>
                                })
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Quantity: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.quantity}
                            onChange={this.onChangeQuantity}
                        />
                    </div>

                    <div className="form-group">
                        <label>Price: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.price}
                            onChange={this.onChangePrice}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}