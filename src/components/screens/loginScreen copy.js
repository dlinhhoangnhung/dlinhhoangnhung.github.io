import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Redirect } from "react-router";
import "../../assets/temp/fonts/material-icon/css/material-design-iconic-font.min.css";
import Loading from "../loading.component";
import { stringify } from "postcss";
import AuthService from "../services/auth.service";
import Navbar from "../navbar.component";
import Forgot from "./forgotScreen"; 

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
                this.props.history.push("/");
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
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="main" style={{ paddingTop: 10 }}>
                        <section className="signup">
                            <div className="container">
                                <div className="signup-content">
                                    <div className="signup-form">
                                        <h2 className="form-title">Sign In</h2>
                                        <div className="form-group">
                                            <label htmlFor="name">
                                                <i className="zmdi zmdi-account material-icons-name"></i>
                                            </label>
                                            <input
                                                type="text"
                                                name="firstname"
                                                id="firstname"
                                                placeholder="Your First Name"
                                                required
                                                value={this.state.username}
                                                onChange={this.onChangeUsername}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">
                                                <i className="zmdi zmdi-email"></i>
                                            </label>
                                            <input
                                                type="lastname"
                                                name="lastname"
                                                id="lastname"
                                                required
                                                value={this.state.password}
                                                onChange={this.onChangePassword}
                                                placeholder="Your Last Name"
                                            />
                                        </div>
                                        <div style={{textAlign: "right"}} className="form-button">
                                            <a  href="/forgot-password">
                                                Forgot Password?
                                            </a>
                                        </div>
                                        <div className="form-group form-button">
                                            <input
                                                type="submit"
                                                name="signin"
                                                id="signin"
                                                className="form-submit"
                                                value="Sign In"
                                            />
                                        </div>



                                    </div>
                                    <div className="signup-image">
                                        <figure>
                                            <img src="assets/imgs/n6.jpg" alt="sing up image" />
                                        </figure>
                                        <a href="/register" className="signup-image-link">
                                            New User?
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </section>

                    </div>
                </form >

            </div>

        )
    }
}
