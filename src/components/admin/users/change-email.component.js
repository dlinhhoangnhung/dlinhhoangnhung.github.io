import React, { Component } from "react";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router'
import userService from "../../services/user.service";
import authService from "../../services/auth.service";

export default class ChangeEmail extends Component {
    constructor(props) {
        super(props)


        this.onChangeE1 = this.onChangeE1.bind(this)
        this.onChangeE2 = this.onChangeE2.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            currentEmail: '',
            newEmail: '',
            isRedirect: undefined
        }
    }

    onChangeE1(c) {
        this.setState({
            currentEmail: c.target.value
        })
    }

    onChangeE2(c) {
        this.setState({
            newEmail: c.target.value
        })
    }
    componentDidMount() {
        const user = authService.getCurrentUser();
        const userId = user.id
        console.log(userId);
    }

    async onSubmit(c) {
        c.preventDefault()

        const data = {
            currentEmail: this.state.currentEmail,
            newEmail: this.state.newEmail,
        }

        console.log(data)

        await userService.changeEmail(this.props.match.params.id, data)
            .then(res => {
                console.log('res.data')
                console.log(res.data)
                toast("Email has been changed :)", res, {
                    type: "warning"
                })
                this.setState({
                    isRedirect: 1
                })
            },
                error => {
                    this.setState({
                        isRedirect: 0
                    })
                    toast("Không thể đổi email, kiểm tra lại nếu có trùng :)", {
                        type: "danger"
                    })
                })


    }
    render() {
        if (this.state.isRedirect) return <Redirect to={'/user-view/user-' + this.props.match.params.id} />
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div class="h-screen bg-purple-400 flex justify-center items-center">
                        <div class="absolute w-60 h-60 rounded-xl bg-purple-300 -top-5 -left-16 z-0 transform rotate-45 hidden md:block">
                        </div>
                        <div class="absolute w-48 h-48 rounded-xl bg-purple-300 -bottom-6 -right-10 transform rotate-12 hidden md:block">
                        </div>
                        <div class="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
                            {/* <div>
                                <h1 class="text-3xl font-bold text-center mb-4 cursor-pointer">Thay đii</h1>
                                <p class="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">Create an
                                    account to enjoy all the services without any ads for free!</p>
                            </div> */}
                            <div class="space-y-4">
                                <input
                                    placeholder="Nhập email hiện tại"
                                    type="text"
                                    required
                                    value={this.state.currentEmail}
                                    onChange={this.onChangeE1}
                                    class="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
                                <input
                                    placeholder="Nhập email mới"
                                    type="text"
                                    required
                                    value={this.state.newEmail}
                                    onChange={this.onChangeE2}
                                    class="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
                            </div>
                            {
                                this.state.isRedirect === 0 &&
                                (
                                    <div class="my-3 block  text-sm text-left text-red-600  bg-red-500 bg-opacity-10 border border-red-400 h-12 flex items-center p-4 rounded-md">
                                        Không thể đổi email, kiểm tra nếu email đã tồn tại hoặc chưa đúng.
                                    </div>
                                )
                            }
                            <div class="text-center mt-6">
                                <button type="submit" value="Edit" class="py-3 w-64 text-xl text-white bg-purple-400 rounded-2xl">Đổi</button>
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