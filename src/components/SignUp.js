import React, { useState } from 'react'

const SignUp = () => {
    const [firstname, setFirstName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [lastname, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const PostData = () => {
        fetch("http://localhost:5001/users/sign-up", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstname: "",
                lastname: "",
                username: "",
                password: "",
                email: ""
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }
    return (

            <div className="main" style={{ paddingTop: 10 }}>
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
                                        value={firstname}
                                        onChange={(f) => setFirstName(f.target.value)}

                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastname">
                                        <i className="zmdi zmdi-lastname"></i>
                                    </label>
                                    <input
                                        type="lastname"
                                        name="lastname"
                                        id="lastname"
                                        required
                                        value={lastname}
                                        onChange={(l) => setLastName(l.target.value)}
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
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
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
                                        value={username}
                                        onChange={(u) => setUsername(u.target.value)}
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
                                        value={password}
                                        onChange={(p) => setPassword(p.target.value)}
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
                                        onClick={()=>PostData()}
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
  
    )


}

export default SignUp
