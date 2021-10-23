import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../../Client'
import validator from 'validator'
import { toast } from "react-toastify";

const Forgot = () => {
    const history = useHistory()
    const [email, setEmail] = useState("")

    const [emailError, setEmailError] = useState('')
    const PostData = () => {
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
            toast("Invalid Email", {
                type: "danger",
            });
        fetch("http://localhost:5001/users/forgot-password", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    toast({ html: data.error, type: "danger" });
                }
                else {
                    toast({ html: data.message, type: "success" })
                    history.push('/login')
                }
            }).catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            <div className="main" style={{ paddingTop: 10 }}>
                <section className="signup">
                    <div className="container">
                        <div className="signup-content">
                            <div className="signup-form">
                                <h2 className="form-title">Forgot Password</h2>
                                <div className="form-group">
                                    <label htmlFor="email">
                                        <i className="zmdi zmdi-email"></i>
                                    </label>
                                    <input
                                        type="lastname"
                                        name="lastname"
                                        id="lastname"
                                        required
                                        // value={this.state.password}
                                        // onChange={this.onChangePassword}
                                        placeholder="Your Email"
                                        value={email}
                                        onChange={(e)=>setEmail(e.target.value)}
                                    />
                                </div>
                                <button onClick={()=>PostData()}>Reset Password</button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Forgot

