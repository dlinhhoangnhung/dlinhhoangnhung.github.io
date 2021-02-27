import React, { Component } from "react"
import axios from "axios"
import {Link} from "react-router-dom"
import Loading from "../loading.component"
import ProductRow from "./product-row.component"

export default class ProductsList extends Component {
    constructor(props) {
        super(props);

        this.deleteProduct = this.deleteProduct.bind(this)

        this.state = { products: [], isLoading: 1 };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/products')
            .then(response => {
                this.setState({
                    isLoading: 0
                })
                if (response.data.length > 0) {
                    this.setState({
                        products: response.data
                    })
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    isLoading: 0
                })
            })
    }

    deleteProduct(id) {
        axios.delete('http://localhost:5000/products/' + id)
            .then(res => console.log(res.data))
        this.setState({
            products: this.state.products.filter(p => p._id !== id)
        })
    }


    productsList() {
        return this.state.products.map(currentproduct => {
            return <ProductRow product = {currentproduct} deleteProduct={this.deleteProduct} key={currentproduct._id}/>
        })
    }

    render() {
        const isLoading = this.state.isLoading;
        return (
            <div>
                <h3>Product List</h3>
                <Link className="nav-item nav-link" to="/create-product">Create Product</Link>

                { isLoading == 0 ?
                    this.state.products.length > 0 ? 
                    <table className="table">
                        <thead className="thead-light">
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Name</th>

                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.productsList()
                            }
                        </tbody>
                    </table> : <p>Data empty</p>
                    : <Loading></Loading>
                }
            </div>
        )
    }
}