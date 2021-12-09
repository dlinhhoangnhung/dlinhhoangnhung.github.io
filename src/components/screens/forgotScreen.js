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
                        <h1 class="text-3xl font-bold text-center mb-4 cursor-pointer">Nhập Email của bạn</h1>

                    </div>
                    <div class="space-y-4">

                        <input
                            required
                            placeholder="Ex: abc@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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

export default Forgot

