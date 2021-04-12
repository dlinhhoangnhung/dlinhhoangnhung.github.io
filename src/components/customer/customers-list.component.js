import React, { Component } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import Loading from "../loading.component"
import CustomerRow from "./customer-row.component"

export default class CustomersList extends Component {
    constructor(props) {
        super(props)

        this.deleteCustomer = this.deleteCustomer.bind(this)

        this.state = { customers: [], isLoading: 1 }
    }

    componentDidMount() {
        axios.get('http://localhost:5001/customers')
            .then(response => {
                this.setState({
                    isLoading: 0
                })
                if (response.data.length > 0) {
                    this.setState({
                        customers: response.data
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

    deleteCustomer(id) {
        axios.delete('http://localhost:5001/customers/' + id)
            .then(res => console.log(res.data))
        this.setState({
            customers: this.state.customers.filter(c => c._id !== id)
        })
    }

    customersList() {
        return this.state.customers.map(currentcustomer => {
            return <CustomerRow customer={currentcustomer} deleteCustomer={this.deleteCustomer} key={currentcustomer._id} />
        })
    }



    render() {
        const isLoading = this.state.isLoading
        return (
            <div>
                <h3>Customers List</h3>
                <Link className="nav-item nav-link" to="/create-customer">Create Customer</Link>

                {
                    isLoading == 0 ?
                        this.state.customers.length > 0 ?
                            <table className="table">
                                <thead className="thead-light">
                                    <tr>
                                        <th>ID</th>
                                        <th>Order ID</th>
                                        <th>Instagram</th>
                                        <th>Name</th>
                                        <th>Phone</th>
                                        <th>Address</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.customersList()
                                    }
                                </tbody>
                            </table> : <p>Data empty</p>
                        : <Loading></Loading>
                }
            </div>
        )
    }
}