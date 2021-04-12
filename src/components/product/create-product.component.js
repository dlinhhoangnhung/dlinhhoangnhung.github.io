import React, { Component } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { Redirect } from 'react-router'

export default class CreateProduct extends Component {
    constructor(props){
        super(props)

        this.onChangeName = this.onChangeName.bind(this)
        this.onChangeDesc = this.onChangeDesc.bind(this)
        this.onChangeCateId = this.onChangeCateId.bind(this)
        this.onChangePrice = this.onChangePrice.bind(this)
        this.onChangeImage = this.onChangeImage.bind(this)
        this.onChangeIsDeleted = this.onChangeIsDeleted.bind(this)
        this.onSubmit = this.onSubmit.bind(this )

        this.state = {
            name: '',
            desc: 'a',
            cateid: '',
            price: 'A1',
            image: 'ads',
            isDeleted: 0,
            categories: [],
            isRedirect: 0
        } 
    }

    componentDidMount(){
        axios.get('http://localhost:5001/categories')
            .then(response => {
                if(response.data.length > 0) {
                    this.setState({
                        categories: response.data,
                        cateid: response.data[0]._id
                    })
                }
            })
    }
    onChangeName(p){
        this.setState({
            name: p.target.value
        })
    }

    onChangeDesc(p){
        this.setState({
            desc: p.target.value
        })
    }

    onChangeCateId(p){
        this.setState({
            cateid: p.target.value
        })
    }

    onChangePrice(p){
        this.setState({
            price: p.target.value
        })
    }

    onChangeImage(p){
        this.setState({
            image: p.target.value
        })
    }

    onChangeIsDeleted(p){
        this.setState({
            isDeleted: p.target.value
        })
    }

    onSubmit(p){
        p.preventDefault()
        const product = {
            name: this.state.name,
            desc: this.state.desc,
            cateid: this.state.cateid,
            price: this.state.price,
            image: this.state.image,
            isDeleted: this.state.isDeleted
        }
        console.log(product)
        axios.post('http://localhost:5001/products/add', product)
            .then(res => {
                console.log(res.data)
                toast("Add successfully !", {
                    type:"warning"
                })
                this.setState({
                    isRedirect: 1
                })
            })
    }
    
    render(){
        if(this.state.isRedirect) return <Redirect to='/products'/>
        return(
            <div>
                <h3>Create Product</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Product Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangeName}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Desciption: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.desc}
                            onChange={this.onChangeDesc}
                        />
                    </div>

                    <div className="form-group">
                        <label>Category ID: </label>
                        <select 
                            required
                            className="form-control"
                            value={this.state.cateid}
                            onChange={this.onChangeCateId}>
                            {
                                this.state.categories.map(function(category) {
                                    return <option key={category._id} value={category._id}>
                                                {category.name}
                                            </option>
                                })
                            }    
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Price: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.price}
                            onChange={this.onChangePrice}
                        />
                    </div>

                    <div className="form-group">
                        <label>Image: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.image}
                            onChange={this.onChangeImage}
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