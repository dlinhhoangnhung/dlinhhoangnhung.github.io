import React, { Component } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from 'react-router'

export default class CreateCategory extends Component {
    constructor(props){
        super(props)

        this.onChangeName = this.onChangeName.bind(this)
        this.onChangeDesc = this.onChangeDesc.bind(this)
        this.onSubmit = this.onSubmit.bind(this )

        this.state = {
            name: '',
            desc: 'abc',
            isRedirect: 0
        } 
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

    onSubmit(c){
        c.preventDefault()

        const category = {
            name: this.state.name,
            desc: this.state.desc
        }

        console.log(category)

        axios.post('http://localhost:5001/categories/add', category)
            .then(res => {
                console.log(res.data)
                toast("Add successfully!", {
                    type: "warning"
                })
                this.setState({
                    isRedirect: 1
                })
            })


        // this.setState({
        //     name:'',
        //     desc: ''
        // })
    }

    render(){
        if(this.state.isRedirect) return <Redirect to='/products'/>
        return(
            <div>
                <h3>Create Category</h3>
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
                            onChangeName={this.onChangeDesc}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}