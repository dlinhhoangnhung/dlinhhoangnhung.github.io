import React, { Component } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import Loading from "../loading.component"
import CategoryRow from "./category-row.component"
import AuthService from "../services/auth.service"
import PrivateSidebar from "../admin/sidebar-admin.component"
import userService from "../services/user.service"
import { toast } from 'react-toastify';

export default class CategoriesList extends Component {
    constructor(props) {
        super(props)

        this.deleteCategory = this.deleteCategory.bind(this)

        this.state = { categories: [], isLoading: 1 }
    }

    componentDidMount() {
        userService.getCategories()
            .then(response => {
                this.setState({
                    isLoading: 0
                })
                if (response.data.length > 0) {
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
        // axios.delete('localhost:5001/users/api/categories/' + id)
        userService.deleteCategory(id)
            .then(res => {
                console.log("res.data: " + res.data)
                toast("Deleted", {
                    type: "warning"
                })
                this.setState({
                    categories: this.state.categories.filter(c => c._id !== id)
                })
            },
                error => {
                    console.log(error);
                })

    }

    categoriesList() {
        return this.state.categories.map(currentcategory => {
            return <CategoryRow category={currentcategory} deleteCategory={this.deleteCategory} key={currentcategory._id} />
        })
    }



    render() {
        const isLoading = this.state.isLoading
        return (
            <div>
                {
                    isLoading == 0 ?
                        this.state.categories.length > 0 ?
                            <div className="bg-like flex flex-row;">
                                {/* <!-- PrivateSide --> */}
                                <PrivateSidebar />

                                {/* <!-- Get data depend on select --> */}
                                <div className="flex flex-col w-4/5 h-full px-8 pt-4">
                                    <div className="w-full h-10 flex flex-row; justify-between">
                                        <div className="text-2xl pl-4">
                                            Organization Overview
                                        </div>
                                        <div className="flex flex-row flex space-x-2">
                                            <div className="h-9 w-20 rounded-md bg-white p-2 flex flex-row;">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-current text-icon" fill="none"
                                                    viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                                </svg>
                                                <div className="text-black ml-1 text-sm">Filters</div>
                                            </div>
                                            <div className="h-9 w-20 rounded-md bg-white p-2 flex flex-row;">
                                                <div><img src="img/Slider.png" className="h-5 w-5 stroke-current text-icon" /></div>
                                                <div className="text-black ml-1 text-sm">Noti</div>
                                            </div>
                                            <div className="h-9 w-20 rounded-md bg-white p-2 flex flex-row;">
                                                <div><img src="img/Outbox.png" className="h-5 w-5 stroke-current text-icon" /></div>
                                                <div className="text-black ml-1 text-sm">Export</div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="bg-table h-full w-full mt-7 rounded-2xl">
                                        <div className="text-xl flex flex-row; justify-between ring-2 ring-btncreate">
                                            <div className=" mx-8 my-8">Category Management</div>
                                            <div className="h9 w-24 ring-1 ring-btncreate p-2 flex flex-row; rounded-md  mx-8 my-8">
                                                <div><img src="img/Create.png" className="h-5 w-5 stroke-current text-icon" /></div>

                                                <Link to="/create-category">
                                                    <div className="text-sm">Add New</div>
                                                </Link>

                                            </div>
                                        </div>

                                        <div className="w-full">
                                            <div className="flex flex-col text-left">
                                                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                                    <div className="py-2 align-middle min-w-full sm:px-6 lg:px-8">
                                                        <div className="px-6 shadow overflow-hidden border-b border-gray-200 ">
                                                            <table className="min-w-full divide-y divide-gray-200">
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col"
                                                                            className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                            Name
                                                                        </th>
                                                                        <th scope="col"
                                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                            Date Created
                                                                        </th>
                                                                        <th scope="col"
                                                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                            #
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody className="bg-white divide-y divide-gray-200 space-x-6">
                                                                    {
                                                                        this.categoriesList()
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : <p>Data empty</p>
                        : <Loading></Loading>
                }

            </div>
        )
    }
}