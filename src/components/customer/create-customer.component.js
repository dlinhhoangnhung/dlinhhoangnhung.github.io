import React, { Component } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from 'react-router'

export default class CreateCustomer extends Component {
    constructor(props){
        super(props)

        this.onChangeName = this.onChangeName.bind(this)
        this.onChangeInsta = this.onChangeInsta.bind(this)
        this.onChangePhone = this.onChangePhone.bind(this)
        this.onChangeAddress = this.onChangeAddress.bind(this)
        this.onSubmit = this.onSubmit.bind(this )

        this.state = {
            name: '',
            insta: 'abc',
            phone: '2345r235r',
            address: 'abc',
            isRedirect: 0
        } 
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

    onSubmit(c){
        c.preventDefault()

        const customer = {
            name: this.state.name,
            address: this.state.address,
            insta: this.state.insta,
            phone: this.state.phone
        }

        console.log(customer)

        axios.post('http://localhost:5001/customers/add', customer)
            .then(res => {
                console.log(res.data)
                toast("Add successfully!", {
                    type: "warning"
                })
                this.setState({
                    isRedirect: 1
                })
            })


        // this.setState({
        //     name:'',
        //     desc: ''
        // })
    }

    render(){
        if(this.state.isRedirect) return <Redirect to='/customers'/>
        return(
            <div>
                <h3>Create Customers</h3>
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
                        <label>Insagram: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.insta} 
                            onChangeName={this.onChangeInsta}
                        />
                    </div>

                    <div className="form-group">
                        <label>Phone: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.phone} 
                            onChangeName={this.onChangePhone}
                        />
                    </div>

                    <div className="form-group">
                        <label>Address: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.address} 
                            onChangeName={this.onChangeAddress}
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