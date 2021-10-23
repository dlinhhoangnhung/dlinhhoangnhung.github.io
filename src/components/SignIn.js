import React from 'react'

const SignIn = () => {
    return (
        <div>
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

                                    <div className="form-group form-button">
                                        <input
                                            type="submit"
                                            name="signin"
                                            id="signin"
                                            className="form-submit"
                                            value="Sign In"
                                        />
                                    </div>

                                    <div className="form-group form-button">
                                        <a href="/forgot-password">
                                            Forgot Password?
                                        </a>
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
        </div>
    )
}

export default SignIn
