import React, { useState, useContext } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { toast } from "react-toastify";

const Reset = () => {
    const history = useHistory()
    const [password, setPassword] = useState("")
    const {token} = useParams() // research
    console.log(token)
    const PostData = () => {
        fetch("http://localhost:5001/users/reset-password", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password, token
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
                                <h2 className="form-title">New Password</h2>
                                <div className="form-group">
                                    <label htmlFor="password">
                                        <i className="zmdi zmdi-email"></i>
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        required
                                        placeholder="Enter new password"
                                        value={password}
                                        onChange={(e)=>setPassword(e.target.value)}
                                    />
                                </div>
                                <button onClick={()=>PostData()}>Update Password</button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Reset

