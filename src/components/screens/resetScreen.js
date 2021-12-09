import React, { useState, useContext } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { toast } from "react-toastify";
import authService from '../services/auth.service';

const Reset = () => {
    const user = authService.getCurrentUser()
    const history = useHistory()
    const [password, setPassword] = useState("")
    const { token } = useParams() // research
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
            .then(res => {
                console.log(res.data)
                toast("Password has been changed :)", {
                    type: "warning"
                })
                if (user) {
                    history.push('/items')
                }
                history.push('/login')
                // if (data.error) {
                //     toast({ html: data.error, type: "danger" });
                // }
                // else {
                //     toast({ html: data.message, type: "success" })
                //     history.push('/login')
                // }


            }).catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            <div class="h-screen bg-purple-400 flex justify-center items-center">
                <div class="absolute w-60 h-60 rounded-xl bg-purple-300 -top-5 -left-16 z-0 transform rotate-45 hidden md:block">
                </div>
                <div class="absolute w-48 h-48 rounded-xl bg-purple-300 -bottom-6 -right-10 transform rotate-12 hidden md:block">
                </div>
                <div class="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
                    <div>
                        <h1 class="text-3xl font-bold text-center mb-4 cursor-pointer">New Password</h1>
                    </div>
                    <div class="space-y-4">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            required
                            placeholder="Enter new password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            class="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
                    </div>
                    <div class="text-center mt-6">
                        <button onClick={() => PostData()} class="py-3 w-64 text-xl text-white bg-purple-400 rounded-2xl">Gửi</button>
                    </div>
                </div>
                <div class="w-40 h-40 absolute bg-purple-300 rounded-full top-0 right-12 hidden md:block"></div>
                <div
                    class="w-20 h-40 absolute bg-purple-300 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block">
                </div>
            </div>
        </div>
    );
}

export default Reset

