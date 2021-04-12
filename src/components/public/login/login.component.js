import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Redirect } from "react-router";
import "../../../assets/temp/fonts/material-icon/css/material-design-iconic-font.min.css";
import Loading from "../../loading.component";

export default class Login extends Component {
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
        axios.post("http://localhost:5001/users/sign-in", user).then((res) => {
            console.log(res.data);
            toast("Successfully Login !", {
                type: "warning",
            });
            this.setState({
                isRedirect: 1,
            });
        });
    }

    render() {
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


            // <form onSubmit={this.onSubmit}>
            //     <div className="main">
            //         <section className="sign-in">
            //             <div className="container">
            //                 <div className="signin-content">
            //                     <div className="signin-image">
            //                         <figure>
            //                             <img src="/assets/imgs/n6.jpg" alt="sing up image" />
            //                         </figure>
            //                         <a href="/register" className="signup-image-link">
            //                             Create an account :)
            //                         </a>
            //                     </div>

            //                     <div className="signin-form">
            //                         <h2 className="form-title">Sign in</h2>
            //                         <div className="form-group">
            //                             <label htmlFor="your_name">
            //                                 <i className="zmdi zmdi-account material-icons-name"></i>
            //                             </label>
            //                             <input type="text"
            //                                 name="your_name"
            //                                 id="your_name"
            //                                 placeholder="Username"
            //                                 required
            //                                 value={this.state.username}
            //                                 onChange={this.onChangeUsername}
            //                             />
            //                         </div>
            //                         <div className="form-group">
            //                             <label htmlFor="your_pass">
            //                                 <i className="zmdi zmdi-lock"></i>
            //                             </label>
            //                             <input type="password"
            //                                 name="your_pass"
            //                                 id="your_pass"
            //                                 placeholder="Password"
            //                                 required
            //                                 value={this.state.password}
            //                                 onChange={this.onChangePassword}
            //                             />
            //                         </div>
            //                         {/* <div className="form-group">
            //                             <input
            //                                 type="checkbox"
            //                                 name="remember-me"
            //                                 id="remember-me"
            //                                 className="agree-term"
            //                             />
            //                             <label htmlFor="remember-me" className="label-agree-term">
            //                                 <span>
            //                                     <span></span>
            //                                 </span>
            //             Remember me
            //                             </label>
            //                         </div> */}
            //                         <div className="form-group form-button">
            //                             <input
            //                                 type="submit"
            //                                 name="signin"
            //                                 id="signin"
            //                                 className="form-submit"
            //                                 value="Log in"
            //                             />
            //                         </div>
            //                         {/* <div className="social-login">
            //                             <span className="social-label">Or login with</span>
            //                             <ul className="socials">
            //                                 <li>
            //                                     <a href="#">
            //                                         <i className="display-flex-center zmdi zmdi-facebook"></i>
            //                                     </a>
            //                                 </li>
            //                                 <li>
            //                                     <a href="#">
            //                                         <i className="display-flex-center zmdi zmdi-twitter"></i>
            //                                     </a>
            //                                 </li>
            //                                 <li>
            //                                     <a href="#">
            //                                         <i className="display-flex-center zmdi zmdi-google"></i>
            //                                     </a>
            //                                 </li>
            //                             </ul>
            //                         </div> */}
            //                     </div>
            //                 </div>
            //             </div>
            //         </section>
            //     </div>
            // </form>

        )
    }
}
