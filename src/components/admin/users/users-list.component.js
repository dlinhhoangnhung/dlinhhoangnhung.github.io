import React, { Component } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import Loading from "../../loading.component"
import UserRow from "./user-row.component"
import AuthService from "../../services/auth.service"
import UserService from "../../services/user.service";
import jwt from 'jwt-decode'

export default class UsersList extends Component {
    constructor(props) {
        super(props)

        this.deleteUser = this.deleteUser.bind(this)

        this.state = { users: [], isLoading: 1 }
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            if (user.role == "user") {
                this.setState({
                    isWarning: 1
                })
            }
            else {
                this.setState({
                    currentUser: user,
                    showAdminBoard: user.role.includes("admin"),
                    isLoggedIn: 1,
                    isWarning: 0
                });
            }
        }

        UserService.getUser().then(
            response => {
                this.setState({
                    isLoading: 0
                })
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data
                    })
                }
            },
            error => {
                console.log(error);
                this.setState({
                    users:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString(),
                    isLoading: 1
                });
            }
        );
    }

    deleteUser(id) {
        axios.delete('http://localhost:5001/users/' + id)
            .then(res => console.log(res.data))
        this.setState({
            users: this.state.users.filter(u => u._id !== id)
        })
    }

    usersList() {
        return this.state.users.map(currentuser => {
            return <UserRow user={currentuser} deleteUser={this.deleteUser} key={currentuser._id} />
        })
    }



    render() {
        const isLoading = this.state.isLoading
        return (
            <div>
                <h3>User List</h3>
                <Link className="nav-item nav-link" to="/create-user">Create User</Link>

                {
                    isLoading == 0 ?
                        this.state.users.length > 0 ?
                            <table className="table">
                                <thead className="thead-light">
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.usersList()
                                    }
                                </tbody>
                            </table> : <p>Data empty</p>
                        : <Loading></Loading>
                }
            </div>
        )
    }
}