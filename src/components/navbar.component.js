import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import "../App.css"
import BoardUser from './public/user/board-user.component'
import BoardAdmin from './admin/board-admin.component';
import Profile from './public/profile/profile.component';
import AuthService from "./services/auth.service";

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
    
        this.state = {
          showAdminBoard: false,
          currentUser: undefined,
        };
      }
    
      componentDidMount() {
        const user = AuthService.getCurrentUser();
    
        if (user) {
          this.setState({
            currentUser: user,
            showAdminBoard: user.role.includes("admin"),
          });
        }
      }
    
      logOut() {
        AuthService.logout();
      }
    
    render() {
        const { currentUser, showAdminBoard } = this.state;

        return (
            <nav className="navbar navbar-expand-lg navbar-light">
                <a className="navbar-brand nav-bar" href="/">Guccdesis</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>


                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-item nav-link active" href="/home">Home <span className="sr-only">(current)</span></Link>
                        <Link className="nav-item nav-link" to="">Shopping</Link>
                        <Link className="nav-item nav-link" to="">Shipping</Link>
                        <Link className="nav-item nav-link" to="">Cart</Link>
                        <Link className="nav-item nav-link" to="/user-profile">Profile</Link>

                        {/* <Link className="right-side nav-item nav-link" to="/register">Sign Up</Link> */}
                        {showAdminBoard && (
                            <li className="nav-item">
                                <Link to={"/admin"} className="nav-link">
                                    Admin Board
                                </Link>
                            </li>
                        )}

                        {currentUser && (
                            <li className="nav-item">
                                <Link to={"/user"} className="nav-link">
                                    User
                                </Link>
                            </li>
                        )}

                        {currentUser ? (
                            <div className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to={"/user-profile"} className="nav-link">
                                        {currentUser.username}
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a href="/login" className="nav-link" onClick={this.logOut}>
                                        LogOut
                                    </a>
                                </li>
                            </div>
                        ) : (
                            <div className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to={"/login"} className="nav-link">
                                        Login
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link to={"/register"} className="nav-link">
                                        Sign Up
                                    </Link>
                                </li>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        )
    }
}