import React, { Component } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { Redirect } from 'react-router'
import UserService from "../services/user.service";

export default class CreateProduct extends Component {
    constructor(props) {
        super(props)

        this.onChangeName = this.onChangeName.bind(this)
        this.onChangeDesc = this.onChangeDesc.bind(this)
        this.onChangeCateId = this.onChangeCateId.bind(this)
        this.onChangePrice = this.onChangePrice.bind(this)
        this.onChangethumbnail = this.onChangethumbnail.bind(this)
        this.onChangeImages = this.onChangeImages.bind(this)
        this.onChangeIsDeleted = this.onChangeIsDeleted.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            name: '',
            desc: 'a',
            cateid: '',
            price: 'A1',
            thumbnail: 'is required',
            images: '',
            isDeleted: 0,
            categories: [],

    
            isRedirect: 0
        }
    }

    componentDidMount() {
        UserService.getCategory().then(
            response => {
                this.setState({
                    isLoading: 0
                })
                if (response.data.length > 0) {
                    this.setState({
                        categories: response.data,
                        cateid: response.data[0]._id
                    })
                }
            },
            error => {
                console.log(error);
                this.setState({
                    products:
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

    onChangeName(p) {
        this.setState({
            name: p.target.value
        })
    }

    onChangeDesc(p) {
        this.setState({
            desc: p.target.value
        })
    }

    onChangeCateId(p) {
        this.setState({
            cateid: p.target.value
        })
    }

    onChangePrice(p) {
        this.setState({
            price: p.target.value
        })
    }

    onChangeImages(p) {
        this.setState({
            images: p.target.value
        })
    }

    onChangethumbnail(p) {
        this.setState({
            thumbnail: p.target.value
        })
    }

    onChangeIsDeleted(p) {
        this.setState({
            isDeleted: p.target.value
        })
    }

    onSubmit(p) {
        p.preventDefault()
        const product = {
            name: this.state.name,
            desc: this.state.desc,
            cateid: this.state.cateid,
            price: this.state.price,
            thumbnail: this.state.thumbnail,
            images: this.state.images,
            isDeleted: this.state.isDeleted
        }

        console.log(product)
        UserService.addProduct(product).then(
            res => {
                console.log(res.data)
                toast("Add successfully !", {
                    type: "warning"
                })
                this.setState({
                    isRedirect: 1
                })
            },
            error => {
                console.log(error);
            }
        );
    }

    render() {
        if (this.state.isRedirect) return <Redirect to='/products' />
        return (
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
                                this.state.categories.map(function (category) {
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
                            value={this.state.images}
                            onChange={this.onChangeImages}
                        />
                    </div>

                    <div className="form-group">
                        <label>Thumbnail: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.thumbnail}
                            onChange={this.onChangethumbnail}
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