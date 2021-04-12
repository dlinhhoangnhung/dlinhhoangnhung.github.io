import React, { Component } from "react"
import axios from "axios"
import {Link} from "react-router-dom"
import Loading from "../loading.component"
import OrderDetailRow from "./orderdetail-row.component"

export default class OrdersDetailList extends Component {
    constructor(props) {
        super(props);

        this.deleteOrderDetail = this.deleteOrderDetail.bind(this)

        this.state = { ordersdetail: [], isLoading: 1 };
    }

    componentDidMount() {
        axios.get('http://localhost:5001/orders-detail')
            .then(response => {
                this.setState({
                    isLoading: 0
                })
                if (response.data.length > 0) {
                    this.setState({
                        ordersdetail: response.data
                    })
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    isLoading: 0
                })
            })
    }

    deleteOrderDetail(id) {
        axios.delete('http://localhost:5001/orders-detail/' + id)
            .then(res => console.log(res.data))
        this.setState({
            ordersdetail: this.state.ordersdetail.filter(o => o._id !== id)
        })
    }

    ordersdetailList() {
        return this.state.ordersdetail.map(currentorderdetail => {
            return <OrderDetailRow order_detail={currentorderdetail} deleteOrderDetail={this.deleteOrderDetail} key={currentorderdetail._id} />
        })
    }

    render() {
        const isLoading = this.state.isLoading
        return (
            <div>
                <h2>Orders List</h2>
                <Link className="nav-item nav-link" to="/create-orderdetail">Create Order Detail</Link>

                { isLoading == 0 ?
                    this.state.ordersdetail.length > 0 ?
                        <table className="table">
                            <thead className="thead-light">
                                <tr>
                                    <th>ID</th>
                                    <th>Order ID</th>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.ordersdetailList()
                                }
                            </tbody>
                        </table> : <p>Data empty</p>
                    : <Loading></Loading>
                }
            </div>
        )
    }
}