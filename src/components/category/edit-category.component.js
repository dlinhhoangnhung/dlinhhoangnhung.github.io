import React, { Component } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from 'react-router'
import authHeader from '../services/auth-header';

export default class EditCategory extends Component {
    constructor(props) {
        super(props)

        this.onChangeName = this.onChangeName.bind(this)
        this.onChangeDesc = this.onChangeDesc.bind(this)
        this.onChangeIsDeleted = this.onChangeIsDeleted.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            name: '',
            desc: '123456',
            isRedirect: 0
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5001/users/api/categories/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    desc: response.data.desc,
                })
            })
            .catch( err => {
                console.log(err);
            })
    }
    
    onChangeName(c) {
        this.setState({
            name: c.target.value
        })
    }

    onChangeDesc(c) {
        this.setState({
            desc: c.target.value
        })
    }

    onChangeIsDeleted(c) {
        this.setState({
            isDeleted: c.target.value
        })
    }

    onSubmit(c) {
        c.preventDefault()

        const category = {
            name: this.state.name,
            desc: this.state.desc,
        }

        console.log(category)

        axios.patch('http://localhost:5001/users/api/categories/' + this.props.match.params.id, category, { headers: authHeader() })
            .then(res => {
                console.log(res.data)
                toast("Update successfully :)", {
                    type: "warning"
                }) 
                this.setState({
                    isRedirect: 1
                })
            })


    }
    render() {
        if(this.state.isRedirect) return <Redirect to='/categories'/>
        return (
            <div>
                <h3>Edit Category</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangeName}
                        />
                    </div>

                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.desc}
                            onChange={this.onChangeDesc}
                        />
                    </div>
                    
                    <div className="form-group">
                        <input type="submit" value="Edit" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}