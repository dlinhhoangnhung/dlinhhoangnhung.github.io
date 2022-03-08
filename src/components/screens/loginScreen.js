import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Redirect } from "react-router";
import Loading from "../loading.component";
import { stringify } from "postcss";
import AuthService from "../services/auth.service";
import Navbar from "../navbar.component";
import Forgot from "./forgotScreen";
import authService from "../services/auth.service";
import G from '../../assets/G.png'
import sha256 from 'crypto-js/sha256';
var crypto = require('crypto');

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: "",
            password: "12345467",
            isRedirect: undefined,

        };
    }

    onChangeUsername(u) {
        this.setState({
            username: u.target.value,
        });
    }

    onChangePassword(u) {
        this.setState({
            password: u.target.value,
        });
    }

    async onSubmit(u) {
        u.preventDefault();
        const hash = crypto.createHash('sha256').update(this.state.password).digest('base64');


        this.setState({
            message: "",
            loading: true
        });

        console.log('login')

        AuthService.login(this.state.username, hash).then(
            () => {
                // this.props.history.push();
                // window.location.reload();
                toast("Successfully Login !", {
                    type: "warning",
                });
                this.setState({
                    isRedirect: 1,
                });
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                this.setState({
                    loading: false,
                    message: resMessage,
                    isRedirect: 0
                });
            }
        );
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/items' } }
        const user = authService.getCurrentUser()
        const { location } = this.props;
        const { state } = location;
        if (user) {
            if (user.role === 'admin') {
                return (
                    <Redirect to='/admin' />
                )
            }
            // if (user.role === 'user') {
            //     if (state && state.from) {

            //         <Redirect to={state.from} />
            //         console.log('alo')

            //     }
            return (
                <Redirect to={from} />
            )
            // }
        }

        return (
            <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        {/* <img className="mx-auto h-12 w-auto" src={G} alt="Workflow" /> */}
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Đăng nhập
                        </h2>
                        {/* <p className="mt-2 text-center text-sm text-gray-600">
                            Or
                            <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                                 chưa có tài khoản ?
                            </a>
                        </p> */}
                    </div>
                    <form onSubmit={this.onSubmit} className="mt-8 space-y-6" action="#" method="POST">
                        <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md shadow-sm -space-y-px">

                            <div>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    value={this.state.username}
                                    onChange={this.onChangeUsername}
                                    autocomplete="username"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Username"
                                />
                            </div>
                            <div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={this.state.password}
                                    onChange={this.onChangePassword}
                                    autocomplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                                <label for="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Ghi nhớ
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="/user-view/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Quên mật khẩu?
                                </a>
                            </div>
                        </div>
                        {
                            this.state.isRedirect === 0 &&
                            (
                                <div class="my-3 block  text-sm text-left text-red-600  bg-red-500 bg-opacity-10 border border-red-400 h-12 flex items-center p-4 rounded-md">
                                    Tên đăng nhập hoặc mật khẩu chưa đúng
                                </div>
                            )
                        }
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                                    </svg>
                                </span>
                                Đăng nhập
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
