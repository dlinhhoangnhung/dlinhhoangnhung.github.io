import React, { Component } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import Loading from "../loading.component"
import CategoryRow from "./category-row.component"
import AuthService from "../services/auth.service"
import UserService from "../services/user.service";

export default class CategoriesList extends Component {
    constructor(props) {
        super(props)

        this.deleteCategory = this.deleteCategory.bind(this)
 
        this.state = { categories: [], isLoading: 1 }
    }

    componentDidMount() {
        UserService.getCategory()
            .then(response => {
                this.setState({
                    isLoading: 0
                })
                if(response.data.length > 0) {
                    this.setState({
                        categories: response.data
                    })
                }
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    isLoading: 0
                })
            })
    }

    deleteCategory(id) {
        axios.delete('http://localhost:5001/categories/' + id)
            .then(res => console.log(res.data))
        this.setState({
            categories: this.state.categories.filter(c => c._id !== id)
        })
    }

    categoriesList() {
        return this.state.categories.map(currentcategory => {
            return <CategoryRow category = {currentcategory} deleteCategory={this.deleteCategory} key={currentcategory._id} />
        })
    }

    

    render() {
        const isLoading = this.state.isLoading
        return (
            <div>
                <h3>Categories List</h3>
                <Link className="nav-item nav-link" to="/create-category">Create Category</Link>

                {
                    isLoading == 0 ?
                    this.state.categories.length > 0 ?
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
                                this.categoriesList()
                            }
                        </tbody>
                    </table> : <p>Data empty</p>
                    : <Loading></Loading>
                }
            </div>
        )
    }
}