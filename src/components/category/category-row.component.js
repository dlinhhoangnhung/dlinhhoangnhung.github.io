import React, { Component } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"

export default class CategoryRow extends Component {
    render(){
        return (
            <tr>
                <td>{this.props.category._id}</td>
                <td>{this.props.category.name}</td>
                <td className="btn-group" >
                    <Link className="btn btn-sm btn-warning" to={"/edit/category/" + this.props.category._id}>Edit</Link> 
            <a className="btn btn-sm btn-danger" href="#" onClick={() => { this.props.deleteCategory(this.props.category._id) }} >Delete</a>
                </td>
            </tr>
        )
    }
}