import React, { Component } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import Loading from "../loading.component"
import OrderRow from "./order-row.component"
import PrivateSidebar from "../admin/sidebar-admin.component"
import userService from "../services/user.service"

export default class OrdersList extends Component {
    constructor(props) {
        super(props)
        this.deleteOrder = this.deleteOrder.bind(this)
        this.state = { orders: [], isLoading: 1 }
    }
    componentDidMount() {
        userService.getOrders()
            .then(response => {
                this.setState({
                    isLoading: 0
                })
                if (response.data.length > 0) {
                    this.setState({
                        orders: response.data,
                    })
                }
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    isLoading: 1
                })
            })


    }

    deleteOrder(id) { // chua lam
        axios.delete('http://localhost:5001/orders/' + id)
            .then(res => console.log(res.data))
        this.setState({
            orders: this.state.orders.filter(o => o._id !== id)
        })
    }

    ordersList() {
        return this.state.orders.map(currentorder => {
            return <OrderRow order={currentorder} deleteOrder={this.deleteOrder} key={currentorder._id} />
        })
    }


    render() {
        const { isLoading, currentUser, showAdminBoard, isLoggedIn, isWarning } = this.state;
        return (
            //  isLoggedIn === 1 && showAdminBoard ?
            <div>
                {isLoading == 0 ?
                    <div className="bg-like flex flex-row;">
                        {/* <!-- PrivateSide --> */}
                        <PrivateSidebar />
                        {/* <!-- Get data depend on select --> */}
                        <div className="flex flex-col w-4/5 h-full px-8 pt-4">
                            <div className="w-full h-10 flex flex-row; justify-between">
                                <div className="text-2xl pl-4">
                                    Admin Overview
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
                                    <div className=" mx-8 my-8">Orders Management</div>
                                    <div className="h9 w-24 ring-1 ring-btncreate p-2 flex flex-row; rounded-md  mx-8 my-8">
                                        <div><img src="img/Create.png" className="h-5 w-5 stroke-current text-icon" /></div>
                                        <a href="/create-product">
                                            <div to="/create-product" className="text-sm">Add New</div>
                                        </a>
                                    </div>
                                </div>

                                <div className="w-full">
                                    <div className="flex flex-col text-left">
                                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                            <div className="py-2 align-middle min-w-full sm:px-6 lg:px-8">
                                                <div className="px-6 pb-3">
                                                    {
                                                        this.state.orders.length > 0 ?
                                                            this.ordersList()
                                                            : <p>Data empty</p>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : <Loading></Loading>
                }
            </div>


        )
    }
}

 // <div>
            //     <h2>Orders List</h2>
            //     <Link className="nav-item nav-link" to="/create-order">Create Order</Link>

            //     { isLoading == 0 ?
            //         this.state.orders.length > 0 ?
            //             <table className="table">
            //                 <thead className="thead-light">
            //                     <tr>
            //                         <th>ID</th>
            //                         <th>Customer Name</th>
            //                         <th>Status</th>
            //                         <th>Ship Address</th>
            //                         <th>Actions</th>
            //                     </tr>
            //                 </thead>
            //                 <tbody>
            //                     {
            //                         this.ordersList()
            //                     }
            //                 </tbody>
            //             </table> : <p>Data empty</p>
            //         : <Loading></Loading>
            //     }
            // </div>