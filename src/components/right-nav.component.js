// chuyen qua thu muc components
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";

import "../../src/client.css"
import BoardUser from './screens/board-user.component'
import BoardAdmin from './admin/board-admin.component';
import ProfileScreen from './screens/profileScreen';
import AuthService from "./services/auth.service";
import { Grid } from '@material-ui/core';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import { pink } from '@material-ui/core/colors';

export default class NavLinks extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showAdminBoard: false,
            currentUser: undefined,
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser(); // check in Local Storae if have user or not

        if (user) { // if have
            this.setState({
                currentUser: user,// set "user in Local Storage" in state
                showAdminBoard: user.role.includes("admin"), // if user role = admin => set showAdminBoard
            });
        }
    }

    logOut() {
        AuthService.logout();
    }

    render() {
        const { currentUser, showAdminBoard } = this.state;
        return (
            <div className="nav-links" >
                <a href="/items">Shopping</a>
                {/* <a href="/cart">
                        <ShoppingBasketIcon color="disabled" style={{marginBottom: 4,  fontSize: 28}} />
                    </a> */}
                {showAdminBoard && (
                    <a href="/admin">
                        Admin Board
                    </a>
                )}
                {currentUser && (
                    <a href="/user">
                        User
                    </a>
                )}
                {currentUser ? (
                    <div className="row">
                        <a href="/user-profile" style={{ paddingRight: 24, paddingLeft: 12 }}>
                            {currentUser.username}
                        </a>
                        <a href="/" onClick={this.logOut} >
                            Sign out
                        </a>
                    </div>
                ) : (
                    <a href="/login">
                        Sign in
                    </a>
                )}
                
            </div>

        )
    }
}