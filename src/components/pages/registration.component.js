import React, { useState } from 'react'
import Axios  from 'axios'
import "../../App.css"
import axios from 'axios'
    
export default function Registration() {
    const [usernameReg, setUsernameReg] = useState("")
    const [passwordReg, setPasswordReg] = useState("")

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [loginStatus, setLoginStatus] = useState("")

    axios.defaults.withCredentials = true

    const register = () => {
        axios.post("http://localhost:5001/register", {
            username: usernameReg,
            password:  passwordReg
        }).then((res) => {
            console.log(res)
        })
    }

    const login 
    return (
        <div>
            <h3>Register</h3>
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
