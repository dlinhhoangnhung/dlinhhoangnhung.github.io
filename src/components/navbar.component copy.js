// chuyen qua thu muc components
import React, { Component, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";
import BoardUser from './screens/board-user.component'
import BoardAdmin from './admin/board-admin.component';
import ProfileScreen from './screens/profileScreen';
import AuthService from "./services/auth.service";
import { Grid } from '@material-ui/core';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import { pink } from '@material-ui/core/colors';

import CartItem from '../components/cart/CartItem'
import ListItem from "./ListItem"
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import SearchBar from './SearchBar';
import CartAnimation from './CartAnimation';
import CartM from './cart/CartM';
import CartS from './cart/CartS';

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
            <div className="nav-bar">
                <a href="/">
                    <img className="nav-logo" src={`${process.env.PUBLIC_URL}/assets/imgs/white_logo.png`} alt="logo"></img>
                </a>

                <div className="nav-links" >
                    {/* <SearchBar/> */}

                    <a href="/items">Shopping</a>
                    {/* <a href="/cart">
                        <ShoppingBasketIcon color="disabled" style={{marginBottom: 4,  fontSize: 28}} />
                    </a> */}
                    {showAdminBoard && (
                        <a href="/admin">
                            Admin Board
                        </a>
                    )}
                    {/* {currentUser && (
                        <a href="/user">
                            User
                        </a>
                    )} */}
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

                    {/* <CartAnimation/> */}
                    <CartM />
                   
                </div>

                <div className="burger-menu">
                    <div>

                    </div>
                    <div>

                    </div>
                    <div>

                    </div>
                </div>
            </div>


        )
    }
}