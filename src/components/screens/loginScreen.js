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

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: "",
            password: "12345467",
            isRedirect: 0,

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



    onSubmit(u) {
        u.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password
        };
        console.log(user);

        this.setState({
            message: "",
            loading: true
        });


        AuthService.login(this.state.username, this.state.password).then(
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
                    message: resMessage
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
            if (user.role === 'user') {
                if (state && state.from) {

                        <Redirect to = { state.from } />
                    console.log('alo')

                }
                return (
                    <Redirect to={from} />
                )
            }
        }

        return (
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Sign in to your account
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Or
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                start your 14-day free trial
                            </a>
                        </p>
                    </div>
                    <form onSubmit={this.onSubmit} className="mt-8 space-y-6" action="#" method="POST">
                        <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md shadow-sm -space-y-px">

                            <div>
                                <label for="username" className="sr-only">Password</label>
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
                                <label for="password" className="sr-only">Password</label>
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
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

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
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            // <form onSubmit={this.onSubmit}>
            //     <div classNameName="main">
            //         <section classNameName="signup">
            //             <div classNameName="container">
            //                 <div classNameName="signup-content">
            //                     <div classNameName="signup-form">
            //                         <h2 classNameName="form-title">Sign In</h2>
            //                         <div classNameName="form-group">
            //                             <label htmlFor="name">
            //                                 <i classNameName="zmdi zmdi-account material-icons-name"></i>
            //                             </label>
            //                             <input
            //                                 type="text"
            //                                 name="firstname"
            //                                 id="firstname"
            //                                 placeholder="Your First Name"
            //                                 required
            //                                 value={this.state.username}
            //                                 onChange={this.onChangeUsername}
            //                             />
            //                         </div>
            //                         <div classNameName="form-group">
            //                             <label htmlFor="email">
            //                                 <i classNameName="zmdi zmdi-email"></i>
            //                             </label>
            //                             <input
            //                                 type="lastname"
            //                                 name="lastname"
            //                                 id="lastname"
            //                                 required
            //                                 value={this.state.password}
            //                                 onChange={this.onChangePassword}
            //                                 placeholder="Your Last Name"
            //                             />
            //                         </div>

            //                         <div classNameName="form-group form-button">
            //                             <input
            //                                 type="submit"
            //                                 name="signup"
            //                                 id="signup"
            //                                 classNameName="form-submit"
            //                                 value="Sign In"
            //                             />
            //                         </div>


            //                     </div>
            //                     <div classNameName="signup-image">
            //                         <figure>
            //                             <img src="assets/imgs/n6.jpg" alt="sing up image" />
            //                         </figure>
            //                         <a href="/login" classNameName="signup-image-link">
            //                             I am already member
            //                         </a>
            //                     </div>
            //                 </div>
            //             </div>
            //         </section>

            //     </div>
            // </form >


        )
    }
}
