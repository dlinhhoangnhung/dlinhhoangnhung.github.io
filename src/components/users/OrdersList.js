// import React, { Component } from "react"
// import axios from "axios"
// import { Link } from "react-router-dom"
// import Loading from "../loading.component"

// export default class UserOrdersList extends Component {
//     constructor(props) {
//         super(props)
//         this.deleteOrder = this.deleteOrder.bind(this)
//         this.state = { orders: [], isLoading: 1 }
//     }
//     componentDidMount() {
//         axios.get('http://localhost:5001/users/api/orders')
//             .then(response => {
//                 this.setState({
//                     isLoading: 0
//                 })
//                 if (response.data.length > 0) {
//                     this.setState({
//                         orders: response.data,
//                     })
//                 }
//             })
//             .catch(err => {
//                 console.log(err)
//                 this.setState({
//                     isLoading: 0
//                 })
//             })


//     }

//     deleteOrder(id) {
//         axios.delete('http://localhost:5001/orders/' + id)
//             .then(res => console.log(res.data))
//         this.setState({
//             orders: this.state.orders.filter(o => o._id !== id)
//         })
//     }
 

//     render() {
//         const isLoading = this.state.isLoading
//         return (
//             <div class="d-flex align-items-center">
//                 <a href="#" class="btn btn-light font-weight-bold btn-sm">Actions</a>
//                 <div class="dropdown dropdown-inline" data-toggle="tooltip" title="" data-placement="left" data-original-title="Quick actions">
//                     <a href="#" class="btn btn-icon" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                         <span class="svg-icon svg-icon-success svg-icon-2x">
//                             <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
//                                 <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
//                                     <polygon points="0 0 24 0 24 24 0 24"></polygon>
//                                     <path
//                                         d="M5.85714286,2 L13.7364114,2 C14.0910962,2 14.4343066,2.12568431 14.7051108,2.35473959 L19.4686994,6.3839416 C19.8056532,6.66894833 20,7.08787823 20,7.52920201 L20,20.0833333 C20,21.8738751 19.9795521,22 18.1428571,22 L5.85714286,22 C4.02044787,22 4,21.8738751 4,20.0833333 L4,3.91666667 C4,2.12612489 4.02044787,2 5.85714286,2 Z"
//                                         fill="#000000"
//                                         fill-rule="nonzero"
//                                         opacity="0.3"
//                                     ></path>
//                                     <path
//                                         d="M11,14 L9,14 C8.44771525,14 8,13.5522847 8,13 C8,12.4477153 8.44771525,12 9,12 L11,12 L11,10 C11,9.44771525 11.4477153,9 12,9 C12.5522847,9 13,9.44771525 13,10 L13,12 L15,12 C15.5522847,12 16,12.4477153 16,13 C16,13.5522847 15.5522847,14 15,14 L13,14 L13,16 C13,16.5522847 12.5522847,17 12,17 C11.4477153,17 11,16.5522847 11,16 L11,14 Z"
//                                         fill="#000000"
//                                     ></path>
//                                 </g>
//                             </svg>
//                         </span>
//                     </a>
//                     <div class="dropdown-menu dropdown-menu-md dropdown-menu-right p-0 m-0">
//                         <ul class="navi navi-hover">
//                             <li class="navi-header font-weight-bold py-4">
//                                 <span class="font-size-lg">Choose Label:</span>
//                                 <i class="flaticon2-information icon-md text-muted" data-toggle="tooltip" data-placement="right" title="" data-original-title="Click to learn more..."></i>
//                             </li>
//                             <li class="navi-separator mb-3 opacity-70"></li>
//                             <li class="navi-item">
//                                 <a href="#" class="navi-link">
//                                     <span class="navi-text">
//                                         <span class="label label-xl label-inline label-light-success">Customer</span>
//                                     </span>
//                                 </a>
//                             </li>
//                             <li class="navi-item">
//                                 <a href="#" class="navi-link">
//                                     <span class="navi-text">
//                                         <span class="label label-xl label-inline label-light-danger">Partner</span>
//                                     </span>
//                                 </a>
//                             </li>
//                             <li class="navi-item">
//                                 <a href="#" class="navi-link">
//                                     <span class="navi-text">
//                                         <span class="label label-xl label-inline label-light-warning">Suplier</span>
//                                     </span>
//                                 </a>
//                             </li>
//                             <li class="navi-item">
//                                 <a href="#" class="navi-link">
//                                     <span class="navi-text">
//                                         <span class="label label-xl label-inline label-light-primary">Member</span>
//                                     </span>
//                                 </a>
//                             </li>
//                             <li class="navi-item">
//                                 <a href="#" class="navi-link">
//                                     <span class="navi-text">
//                                         <span class="label label-xl label-inline label-light-dark">Staff</span>
//                                     </span>
//                                 </a>
//                             </li>
//                             <li class="navi-separator mt-3 opacity-70"></li>
//                             <li class="navi-footer py-4">
//                                 <a class="btn btn-clean font-weight-bold btn-sm" href="#"> <i class="ki ki-plus icon-sm"></i>Add new</a>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </div>

//         )
//     }
// }