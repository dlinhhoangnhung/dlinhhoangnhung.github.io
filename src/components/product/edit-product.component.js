import React, { Component } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from 'react-router'
import UserService from "../services/user.service";
import authHeader from '../services/auth-header';


export default class EditProduct extends Component {
    constructor(props) {
        super(props)

        this.onChangeName = this.onChangeName.bind(this)
        this.onChangeDesc = this.onChangeDesc.bind(this)
        this.onChangeCateId = this.onChangeCateId.bind(this)
        this.onChangePrice = this.onChangePrice.bind(this)
        this.onChangethumbnail = this.onChangethumbnail.bind(this)
        this.onChangeImages = this.onChangeImages.bind(this)
        this.onChangeIsDeleted = this.onChangeIsDeleted.bind(this)
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            name: '',
            desc: 'a',
            cateid: '',
            price: 'A1',
            thumbnail: 'ads',
            images: '',
            isDeleted: 0,
            categories: [],
            isRedirect: 0
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5001/users/api/products/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    desc: response.data.desc,
                    cateid: response.data.cateid,
                    price: response.data.price,
                    thumbnail: response.data.thumbnail,
                    images: response.data.images,
                    isDeleted: response.data.isDeleted
                })
            })
            .catch(err => {
                console.log(err);
            })

        axios.get('http://localhost:5001/users/api/categories')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        categories: response.data,
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })

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

    onChangethumbnail(p) {
        this.setState({
            thumbnail: p.target.files
        })
    }

    onChangeImages(p) {
        this.setState({
            images: p.target.files
        })
    }

    onChangeIsDeleted(p) {
        this.setState({
            isDeleted: p.target.value
        })
    }

    onChange(p) {
    }

    onSubmit(p) {
        p.preventDefault();

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

        axios.patch('http://localhost:5001/users/api/products/' + this.props.match.params.id, product, { headers: authHeader() })
            .then(res => {
                console.log(res.data)
                toast("Update successfully :)", {
                    type: "warning"
                })
                this.setState({
                    isRedirect: 1
                })
            })
        console.log(this.state.images)

    }
    render() {
        if (this.state.isRedirect) return <Redirect to='/products' />
        return (
            <div>
                <h3>Edit Product</h3>
                <form onSubmit={this.onSubmit} action="/multiple-upload" method="PATCH" encType="multipart/form-data">
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
                        <label>Image Thumbnail</label>
                        <input type="file" name="imagesMain" id="files" onChange={this.onChangethumbnail} multiple />
                    </div>

                    <div className="form-group">
                        <label>Image Upload</label>
                        <input type="file" name="images" id="files" onChange={this.onChangeImages} multiple />
                    </div>



                    <div className="form-group">
                        <input type="submit" value="Edit" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}