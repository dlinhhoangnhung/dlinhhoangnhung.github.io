import { Router } from "@material-ui/icons";
import React, { Component } from "react";
import Loading from "../loading.component";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import AuthService from "../services/auth.service";
import UserBoard from "./board-user.component";

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      showProfile: false,
      isLoggedIn: false
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    const token = user.token
    console.log(token)
    if (user) {
      this.setState({
        currentUser: user,
        isLoggedIn: true
      });
    }
  }

  render() {
    const { currentUser, isLoggedIn } = this.state;

    return (
      <Route>
        <UserBoard />
      </Route>

      // isLoggedIn ?

      // <div className="container">
      //   <header className="jumbotron">
      //     <h3>
      //       <strong>{currentUser.username}</strong> Profile
      //     </h3>
      //   </header>
      //   {/* <p>
      //     <strong>Token:</strong>{" "}
      //     {currentUser.token.substring(0, 20)} ...{" "}
      //     {currentUser.token.substr(currentUser.token.length - 20)}
      //   </p> */}
      //   <p>
      //     <strong>Id:</strong>{" "}
      //     {currentUser.username}
      //   </p>
      //   <p>
      //     <strong>Email:</strong>{" "}
      //     {currentUser.email}
      //   </p>
      //   {/* sdt */}
      //   {/* <p> 
      //     <strong>Id:</strong>{" "}
      //     {currentUser.phone}
      //   </p> */}
      //   {/* dia chi */}
      //   {/* <p>
      //     <strong>Id:</strong>{" "}
      //     {currentUser.address}
      //   </p> */}
      //   <p>
      //     <strong>Role:</strong>{" "}
      //     {currentUser.role}
      //   </p>
      //   <ul>
      //     {this.state.currentUser.roles &&
      //       this.state.currentUser.roles.map((role, index) => (<li key={index}>{currentUser.role}</li>))}
      //   </ul>

      // </div>
      // : <Loading></Loading>
    );
  }
}