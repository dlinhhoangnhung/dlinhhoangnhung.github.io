import React, { Component } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from 'react-router'

export default class EditCustomer extends Component {
    constructor(props) {
        super(props)

        this.onChangeName = this.onChangeName.bind(this)
        this.onChangeAddress = this.onChangeAddress.bind(this)
        this.onChangeInsta = this.onChangeInsta.bind(this)
        this.onChangePhone = this.onChangePhone.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            id: 'a1',
            name: '',
            insta: 'af',
            phone: '3241',
            address: 'aw3',
            isRedirect: 0
        }
    }
    
    componentDidMount() {
        axios.get('http://localhost:5001/customers/' + this.props.match.params.id)
            .then(response => {
                console.log("aloalo:" + response.data.id )
                 this.setState({
                    name: response.data.name,
                    insta: response.data.insta,
                    phone: response.data.phone,
                    address: response.data.address
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    onChangeName(c) {
        this.setState({
            name: c.target.value
        })
    }

    onChangeInsta(c) {
        this.setState({
            insta: c.target.value
        })
    }

    onChangePhone(c) {
        this.setState({
            phone: c.target.value
        })
    }

    onChangeAddress(c) {
        this.setState({
            address: c.target.value
        })
    }

    onSubmit(c) {
        c.preventDefault()

        const customer = {
            name: this.state.name,
            insta: this.state.insta,
            phone: this.state.phone,
            address: this.state.address,
        }

        console.log(customer)

        axios.post('http://localhost:5001/customers/update/' + this.props.match.params.id, customer)
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
        if (this.state.isRedirect) return <Redirect to='/customers' />
        return (
            <div>
                <h3>Edit Customers</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangeName}
                        />
                    </div>

                    <div className="form-group">
                        <label>Instagram: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.insta}
                            onChange={this.onChangeInsta}
                        />
                    </div>

                    <div className="form-group">
                        <label>Phone: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.phone}
                            onChange={this.onChangePhone}
                        />
                    </div>

                    <div className="form-group">
                        <label>Address: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.address}
                            onChange={this.onChangeAddress}
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