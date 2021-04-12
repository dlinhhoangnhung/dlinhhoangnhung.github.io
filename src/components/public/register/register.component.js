import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Redirect } from "react-router";
import "../../../assets/temp/fonts/material-icon/css/material-design-iconic-font.min.css"
import Loading from "../../loading.component";

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            firstName: "today 31/3",
            lastName: "yea",
            email: "q6@gmail.com",
            username: "",
            password: "12345467",
            isRedirect: 0,

        };
    }

    onChangeFirstName(u) {
        this.setState({
            firstName: u.target.value,
        });
    }

    onChangeLastName(u) {
        this.setState({
            lastName: u.target.value,
        });
    }

    onChangeEmail(u) {
        this.setState({
            email: u.target.value,
        });
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
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
        };
        console.log(user);
        axios.post("http://localhost:5001/users/sign-up", user).then((res) => {
            console.log(res.data);
            toast("Successfully Registed !", {
                type: "warning",
            });
            this.setState({
                isRedirect: 1,
            });
        });
    }

    render() {
        const isLoading = this.state.isLoading

        // if (this.state.isRedirect) return <Redirect to="/" />;
        return (
                    <form onSubmit={this.onSubmit}>
                        <div className="main">
                            <section className="signup">
                                <div className="container">
                                    <div className="signup-content">
                                        <div className="signup-form">
                                            <h2 className="form-title">Sign up</h2>
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
                                                    value={this.state.firstName}
                                                    onChange={this.onChangeFirstName}

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
                                                    value={this.state.lastName}
                                                    onChange={this.onChangeLastName}
                                                    placeholder="Your Last Name"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="email">
                                                    <i className="zmdi zmdi-email"></i>
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    required
                                                    value={this.state.email}
                                                    onChange={this.onChangeEmail}
                                                    placeholder="Your Email"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="pass">
                                                    <i className="zmdi zmdi-lock"></i>
                                                </label>
                                                <input
                                                    type="username"
                                                    name="username"
                                                    id="username"
                                                    required
                                                    value={this.state.username}
                                                    onChange={this.onChangeUsername}
                                                    placeholder="Username"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="pass">
                                                    <i className="zmdi zmdi-lock"></i>
                                                </label>
                                                <input
                                                    type="password"
                                                    name="pass"
                                                    id="pass"
                                                    required
                                                    value={this.state.password}
                                                    onChange={this.onChangePassword}
                                                    placeholder="Password"
                                                />
                                            </div>
                                            {/* <div class="form-group">
                                            <label for="re-pass">
                                                <i class="zmdi zmdi-lock-outline"></i>
                                            </label>
                                            <input
                                                type="password"
                                                name="re_pass"
                                                id="re_pass"
                                                placeholder="Repeat your password"
                                            />
                                        </div> */}
                                            {/* <div className="form-group"> 
                                            <input
                                                type="checkbox"
                                                name="agree-term"
                                                id="agree-term"
                                                className="agree-term"
                                                required
                                            />
                                            <label for="agree-term" className="label-agree-term">
                                                <span>
                                                    <span></span>
                                                </span>
                                                I agree all statements in{" "}
                                                <a href="#" className="term-service">
                                                    Terms of service
                                                </a>
                                            </label>
                                        </div> */}
                                            <div className="form-group form-button">
                                                <input
                                                    type="submit"
                                                    name="signup"
                                                    id="signup"
                                                    className="form-submit"
                                                    value="Create"
                                                />
                                            </div>
                                        </div>
                                        <div className="signup-image">
                                            <figure>
                                                <img src="assets/imgs/n6.jpg" alt="sing up image" />
                                            </figure>
                                            <a href="/login" className="signup-image-link">
                                                I am already member
                                    </a>
                                        </div>
                                    </div>
                                </div>
                            </section>

                        </div>
                    </form>
                            )
    }
}
