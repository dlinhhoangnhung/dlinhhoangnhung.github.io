import React, { Component } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { Redirect } from 'react-router'

export default class CreateOrder extends Component {
    constructor(props){
        super(props)

        this.onChangeCusId = this.onChangeCusId.bind(this)
        this.onChangeAmount = this.onChangeAmount.bind(this)
        this.onChangeShipAddress = this.onChangeShipAddress.bind(this)
        this.onChangeStatus = this.onChangeStatus.bind(this)
        this.onChangeIsDeleted = this.onChangeIsDeleted.bind(this)
        this.onSubmit = this.onSubmit.bind(this )

        this.state = {
            cusid: '',
            amount: '1000000',
            ship_address: 'q6',
            status: '1',
            isDeleted: 0,
            customers: [],

            isRedirect: 0
        } 
    }

    componentDidMount(){
        axios.get('http://localhost:5001/customers')
            .then(response => {
                if(response.data.length > 0 ) {
                    this.setState({
                        customers: response.data,
                        cusid: response.data[0]._id
                    })
                }
            })
    }
    onChangeCusId(o){
        this.setState({
            cusid: o.target.value
        })
    }

    onChangeAmount(o){
        this.setState({
            amount: o.target.value
        })
    }

    onChangeShipAddress(o){
        this.setState({
            ship_address: o.target.value
        })
    }

    onChangeStatus(o){
        this.setState({
            status: o.target.value
        })
    }

    onChangeIsDeleted(o){
        this.setState({
            isDeleted: o.target.value
        })
    }

    onSubmit(o){
        o.preventDefault()
        const order = {
            cusid: this.state.cusid,
            amount: this.state.amount,
            ship_address: this.state.ship_address,
            status: this.state.status,
            isDeleted: this.state.isDeleted
        }
        console.log(order)
        axios.post('http://localhost:5001/orders/add', order)
            .then(res => {
                console.log(res.data)
                toast("Add successfully !", {
                    type:"warning"
                })
                this.setState({
                    isRedirect: 1
                })
            })
    }
    
    render(){
        if(this.state.isRedirect) return <Redirect to='/orders'/>
        return(
            <div>
                <h3>Create Order</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Customer: </label>
                        <select 
                            required
                            className="form-control"
                            value={this.state.cusid}
                            onChange={this.onChangeCusId}>
                            {
                                this.state.customers.map(function(customer) {
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
                        <label>Ship Address: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.ship_address}
                            onChange={this.onChangeShipAddress}
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
                        <input type="submit" value="Create" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}