import React, { Component } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { Redirect } from 'react-router'

export default class Register extends Component {
    constructor(props) {
        super(props)

        this.onChangeFirstName=this.onChangeFirstName.bind(this)
        this.onChangeLastName=this.onChangeLastName.bind(this)
        this.onChangeEmail=this.onChangeEmail.bind(this)
        this.onChangeUsername=this.onChangeUsername.bind(this)
        this.onChangePassword=this.onChangePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            firstName: 'today 31/3',
            lastName: 'yea',
            email: 'q6@gmail.com',
            username: '',
            password: 0,

            isRedirect: 0
        }
    }


    onChangeFirstName(u) {
        this.setState({
            firstName: u.target.value
        })
    }

    onChangeLastName(u) {
        this.setState({
            lastName: u.target.value
        })
    }

    onChangeEmail(u) {
        this.setState({
            email: u.target.value
        })
    }

    onChangeUsername(u) {
        this.setState({
            username: u.target.value
        })
    }

    onChangePassword(u) {
        this.setState({
            password: u.target.value
        })
    }

    onSubmit(u) {
        u.preventDefault()
        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        }
        console.log(user)
        axios.post('http://localhost:5001/users/sign-up', user)
            .then(res => {
                console.log(res.data)
                toast("Successfully Registed !", {
                    type: "warning"
                })
                this.setState({
                    isRedirect: 1
                })
            })
    }

    render() {
        if (this.state.isRedirect) return <Redirect to='/' />
        return (
        //     <form onSubmit={this.onSubmit}>
        //         <h3>Sign Up</h3>

        //         <div className="form-group">
        //             <label>Email</label>
        //             <input type="text" 
        //             required
        //             className="form-control" 
        //             placeholder="Enter Email"
        //             value={this.state.email}
        //             onChange={this.onChangeEmail} />
        //         </div>
        //         <div className="form-group">
        //             <label>Username</label>
        //             <input type="text" 
        //             required
        //             className="form-control" 
        //             placeholder="Enter email"
        //             value={this.state.username}
        //             onChange={this.onChangeUsername} />
        //         </div>
                
        //         <div className="form-group">
        //             <label>Password</label>
        //             <input type="text" 
        //             required
        //             className="form-control" 
        //             placeholder="Enter password"
        //             value={this.state.password}
        //             onChange={this.onChangePassword} />
        //         </div>

        //         <div className="form-group">
        //             <div className="custom-control custom-checkbox">
        //                 <input type="checkbox" className="custom-control-input" id="customCheck1" />
        //                 <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
        //             </div>
        //         </div>

        //         <button type="submit" className="btn btn-primary btn-block">Submit</button>
        //         <p className="forgot-password text-right">
        //             Forgot <a href="#">password?</a>
        //         </p>
        //     </form>
        )
    }
}