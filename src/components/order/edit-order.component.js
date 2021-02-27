import React, { Component } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from 'react-router'

export default class EditOrder extends Component {
    constructor(props) {
        super(props)

        this.onChangeCusId = this.onChangeCusId.bind(this)
        this.onChangeAmount = this.onChangeAmount.bind(this)
        this.onChangeShipAddress = this.onChangeShipAddress.bind(this)
        this.onChangeStatus = this.onChangeStatus.bind(this)
        this.onChangeIsDeleted = this.onChangeIsDeleted.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            cusid: '',
            amount: '123456',
            status: '1',
            ship_address: 'q6',

            isDeleted: 0,
            customers: [],
            isRedirect: 0
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/orders/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    cusid: response.data.cusid,
                    amount: response.data.amount,
                    ship_address: response.data.ship_address,
                    status: response.data.status,
                    isDeleted: response.data.isDeleted
                })
            })
            .catch( err => {
                console.log(err);
            })

        axios.get('http://localhost:5000/customers')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        customers: response.data,
                    })
                }
            })
            .catch( err => {
                console.log(err);
            })

    }
    
    onChangeCusId(o) {
        this.setState({
            cusid: o.target.value
        })
    }

    onChangeAmount(o) {
        this.setState({
            amount: o.target.value
        })
    }

    onChangeStatus(o) {
        this.setState({
            status: o.target.value
        })
    }

    onChangeShipAddress(o) {
        this.setState({
            ship_address: o.target.value
        })
    }

    onChangeIsDeleted(p) {
        this.setState({
            isDeleted: p.target.value
        })
    }

    onSubmit(o) {
        o.preventDefault()

        const order = {
            cusid: this.state.cusid,
            amount: this.state.amount,
            status: this.state.status,
            ship_address: this.state.ship_address,
            isDeleted: this.state.isDeleted
        }

        console.log(order)

        axios.post('http://localhost:5000/orders/update/' + this.props.match.params.id, order)
            .then(res => {
                console.log(res.data)
                toast("Update successfully :)", {
                    type: "warning"
                }) 
                this.setState({
                    isRedirect: 1
                })
            })


    }
    render() {
        if(this.state.isRedirect) return <Redirect to='/orders'/>
        return (
            <div>
                <h3>Edit Order</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Cus ID: </label>
                        <select
                            required
                            className="form-control"
                            value={this.state.cusid}
                            onChange={this.onChangeCusId}>
                            {
                                this.state.customers.map(function (customer) {
                                    return <option key={customer._id} value={customer._id}>
                                        {customer.name}
                                    </option>
                                })
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Amount: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.amount}
                            onChange={this.onChangeAmount}
                        />
                    </div>

                    <div className="form-group">
                        <label>Status: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.status}
                            onChange={this.onChangeStatus}
                        />
                    </div>
                    <div className="form-group">
                        <label>Ship Address: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.ship_address}
                            onChange={this.onChangeAmount}
                        />
                    </div>


                    <div className="form-group">
                        <input type="submit" value="Edit" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}