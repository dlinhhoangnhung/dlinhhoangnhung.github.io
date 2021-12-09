import React, { Component } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from 'react-router'
import authHeader from "../services/auth-header";

export default class CreateCategory extends Component {
    constructor(props) {
        super(props)

        this.onChangeName = this.onChangeName.bind(this)
        this.onChangeDesc = this.onChangeDesc.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            name: '',
            desc: 'nhập...',
            isRedirect: 0
        }
    }

    onChangeName(c) {
        this.setState({
            name: c.target.value
        })
    }

    onChangeDesc(c) {
        this.setState({
            desc: c.target.value
        })
    }

    async onSubmit(c) {
        c.preventDefault()

        const category = {
            name: this.state.name,
            desc: this.state.desc
        }

        console.log(category)
        await axios.post('http://localhost:5001/users/api/categories/', category, {
            headers: authHeader()
        })
            .then(res => {
                console.log("res.data: " + res.data)
                toast("Add successfully !", {
                    type: "success"
                })
                this.setState({
                    isRedirect: 1
                })
            },
                error => {
                    console.log(error);
                })
    }

    render() {
        if (this.state.isRedirect) return <Redirect to='/admin-categories' />
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div class="h-screen bg-purple-400 flex justify-center items-center">
                        <div class="absolute w-60 h-60 rounded-xl bg-purple-300 -top-5 -left-16 z-0 transform rotate-45 hidden md:block">
                        </div>
                        <div class="absolute w-48 h-48 rounded-xl bg-purple-300 -bottom-6 -right-10 transform rotate-12 hidden md:block">
                        </div>
                        <div class="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
                            <div>
                                <h1 class="text-3xl font-bold text-center mb-4 cursor-pointer">Create An Account</h1>
                                <p class="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">Create an
                                    account to enjoy all the services without any ads for free!</p>
                            </div>
                            <div class="space-y-4">
                                <input
                                    type="text"
                                    required
                                    value={this.state.name}
                                    onChange={this.onChangeName}
                                    class="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
                                <input
                                    type="text"
                                    required
                                    value={this.state.desc}
                                    onChange={this.onChangeDesc}
                                    class="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
                            </div>
                            <div class="text-center mt-6">
                                <button type="submit" value="Create" class="py-3 w-64 text-xl text-white bg-purple-400 rounded-2xl">Create Account</button>
                                <p class="mt-4 text-sm">Already Have An Account? <span class="underline cursor-pointer"> Sign In</span>
                                </p>
                            </div>
                        </div>
                        <div class="w-40 h-40 absolute bg-purple-300 rounded-full top-0 right-12 hidden md:block"></div>
                        <div
                            class="w-20 h-40 absolute bg-purple-300 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block">
                        </div>
                    </div>
                </form>


            </div>
        )
    }
}