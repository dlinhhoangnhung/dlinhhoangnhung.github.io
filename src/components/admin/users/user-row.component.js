import React, { Component } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"

export default class UserRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.user._id}</td>
                <td>{this.props.user.name}</td>
                <td className="btn-group" >
                    <Link className="btn btn-sm btn-warning" to={"/edit/user/" + this.props.user._id}>Edit</Link>
                    <a className="btn btn-sm btn-danger" href="#" onClick={() => { this.props.deleteUser(this.props.user._id) }} >Delete</a>
                </td>
            </tr>
        )
    }
}