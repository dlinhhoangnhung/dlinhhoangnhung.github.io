
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
import user from '../assets/figma-img/person.svg'
import search from '../assets/figma-img/search.svg'
import searchstore from '../assets/figma-img/search.svg'
import '../Navbar.css'
import CarouseBar from './CarouseBar';

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
            <nav className="nav-pad inrow">


                <div >
                    <a href="/cases" className="menu-ch">
                        Mobile Case
                    </a>
                    <a href="/cases" className="menu-ch">
                        Street Style
                    </a>
                    <a href="/cases" className="menu-ch">
                        For Woman
                    </a>
                </div>

                <div>
                   
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="nhập tên, loại,.."
                    >
                    </input>
                    <div className="az">
                        <div className="hamburger-menu">
                            <div className="line line-1"></div>
                            <div className="line line-2"></div>
                            <div className="line line-3"></div>
                        </div>
                    </div>
                </div>

            </nav>
            //             <header className="nav-bar" >
            //                 <div className="nav-pad inrow whitespace ">
            //                     <div className="inrow">
            //                         <a href="/">
            //                             <img className="nav-logo" src={`${process.env.PUBLIC_URL}/assets/imgs/black_logo.png`} alt="logo"></img>
            //                         </a>
            //                         <SearchBar />
            //                     </div>


            //                     <div className="right-content inrow">

            //                         <div className="right_links inrow">
            //                             {/* {showAdminBoard && (
            //     <a href="/admin">
            //         Admin Board
            //     </a>
            // )} */}

            //                             <p>
            //                                 <a href="/items">Shopping</a>
            //                             </p>
            //                             <p>
            //                                 <img className="person-btn" src={user} />
            //                                 {/* when hover icon then dropdown below  */}
            //                                 {currentUser ? (
            //                                     <div className="sub-menu-1">
            //                                         <a href="/user-profile" >
            //                                             {currentUser.username}
            //                                         </a>
            //                                         <a href="/" onClick={this.logOut} >
            //                                             Sign out
            //                                         </a>
            //                                     </div>
            //                                 ) : (
            //                                     <div className="sub-menu-1">
            //                                         <a href="/login">
            //                                             Đăng Nhập
            //                                         </a>
            //                                         <a href="/register" className="signup-image-link">
            //                                             Đăng Kí
            //                                         </a>
            //                                     </div>

            //                                 )}

            //                             </p>
            //                             <p>
            //                                 <CartM />
            //                             </p>




            //                             {/* <CartAnimation/> */}
            //                         </div>
            //                         <div className="burger">
            //                             <div className="lin1">

            //                             </div>
            //                             <div className="lin2">

            //                             </div>
            //                             <div className="lin3">

            //                             </div>
            //                         </div>
            //                     </div>
            //                 </div>




            //             </header>


        )
    }
}

// // chuyen qua thu muc components
// import React, { Component, useState } from 'react'
// import { Link } from 'react-router-dom'
// import { useSelector, useDispatch } from "react-redux";
// import BoardUser from './screens/board-user.component'
// import BoardAdmin from './admin/board-admin.component';
// import ProfileScreen from './screens/profileScreen';
// import AuthService from "./services/auth.service";
// import { Grid } from '@material-ui/core';
// import LocalMallIcon from '@material-ui/icons/LocalMall';
// import { pink } from '@material-ui/core/colors';

// import CartItem from '../components/cart/CartItem'
// import ListItem from "./ListItem"
// import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
// import SearchBar from './SearchBar';
// import CartAnimation from './CartAnimation';
// import CartM from './cart/CartM';
// import CartS from './cart/CartS';
// import { signout } from '../redux/actions/userActions';

// const Navbar = () => {
//     const userSignin = useSelector((state) => state.getUserSignin)
//     const { userInfo } = userSignin
//     console.log("user: " + userInfo)
//     const dispatch = useDispatch()
//     const logOut = () => {
//         dispatch(signout())
//     };

//     return (
//         <div className="nav-bar">
//             <a href="/">
//                 <img className="nav-logo" src={`${process.env.PUBLIC_URL}/assets/imgs/white_logo.png`} alt="logo"></img>
//             </a>

//             <div className="nav-links" >
//                 {/* <SearchBar/> */}

//                 <a href ="/items">Shopping</a>
//                 {/* <a href="/cart">
//                 <ShoppingBasketIcon color="disabled" style={{marginBottom: 4,  fontSize: 28}} />
//             </a> */}
//                 {!userInfo.role.includes("user")  ? (
//                     <a href="/admin">
//                         Admin Board
//                     </a>
//                 ) : null}
//                 {/* {currentUser && (
//                 <a href="/user">
//                     User
//                 </a>
//             )} */}
//                 {userInfo ? (
//                     // <div className="dropdown">
//                     <div>
//                         <a href="/user-profile" style={{ paddingRight: 24, paddingLeft: 12, color: 'white' }}>
//                             {userInfo.username} 
//                             {/* <i className="fa fa-caret-down"></i>{' '} */}
//                         </a>
//                         {/* <ul className="dropdown-content"> */}
//                         <ul>
//                             <a href="/" onClick={logOut} >
//                                 Sign out
//                             </a>
//                         </ul>

//                     </div>

//                 ) : (
//                     <a href="/login">
//                         Sign in
//                     </a>
//                 )}

//                 {/* <CartAnimation/> */}
//                 <CartM />

//             </div>

//             <div className="burger-menu">
//                 <div>

//                 </div>
//                 <div>

//                 </div>
//                 <div>

//                 </div>
//             </div>
//         </div>


//     )
// }

// export default Navbar