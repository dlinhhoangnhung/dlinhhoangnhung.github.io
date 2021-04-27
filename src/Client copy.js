import logo from './logo.svg'
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./client.css"
import "./assets/temp/css/style.css"

import AuthService from './components/services/auth.service';

import Loading from "./components/loading.component"
import Navbar from "./components/navbar.component"
import Home from './components/public/home/home.component'
import Register from './components/public/register/register.component';
import Login from './components/public/login/login.component'
import CreateProduct from './components/product/create-product.component'
import BoardUser from './components/public/user/board-user.component'
import BoardAdmin from './components/admin/board-admin.component';
import MemberProfile from './components/public/profile/profile.component';

class Client extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
            });
        }
    }

    logOut() {
        AuthService.logout();
    }

    render() {
        const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
        return (
            <div>


                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <Link to={"/"} className="navbar-brand">
                        Guccdesis
          </Link>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/home"} className="nav-link">
                                Home
              </Link>
                        </li>

                        {BoardAdmin && (
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
                    </div>

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
                </nav>
                <div className="container mt-3">
                    <Switch>
                        <Router>
                            <Route exact path={["/", "/home"]} component={Home} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/register" component={Register} />
                            <Route exact path="/user-profile" component={MemberProfile} />
                            <Route path="/user" component={BoardUser} />
                            <Route path="/admin" component={BoardAdmin} />
                            <Route path="/create-product" component={CreateProduct} />
                            <Navbar />
                            <ToastContainer />
                        </Router>
                    </Switch>
                </div >


            </div>

        );
    }
}
export default Client
