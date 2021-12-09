// import React, { Component } from "react";
// import axios from "axios";
// import 'react-toastify/dist/ReactToastify.css';
// import { toast } from 'react-toastify';
// import { Redirect } from 'react-router'
// import userService from "../../services/user.service";

// export default class ChangePassword extends Component {
//     constructor(props) {
//         super(props)

//         this.onChangeE1 = this.onChangeE1.bind(this)
//         this.onChangeE2 = this.onChangeE2.bind(this)
//         this.onSubmit = this.onSubmit.bind(this)

//         this.state = {
//             currentPassword: '',
//             newPassword: '',
//         }
//     }

//     onChangeE1(c) {
//         this.setState({
//             currentPassword: c.target.value
//         })
//     }

//     onChangeE2(c) {
//         this.setState({
//             newPassword: c.target.value
//         })
//     }

//     async onSubmit(c) {
//         c.preventDefault()

//         const data = {
//             currentPassword: this.state.currentPassword,
//             newPassword: this.state.newPassword,
//         }

//         console.log(data)

//         await userService.changeEmail(this.props.match.params.id, data)
//             .then(res => {
//                 console.log(res.data)
//                 toast("Password has been changed :)", {
//                     type: "warning"
//                 })
//                 this.setState({
//                     isRedirect: 1
//                 })
//             },
//                 error => {
//                     console.log(error);
//                 })


//     }
//     render() {
//         if (this.state.isRedirect) return <Redirect to='/user-profile' />
//         return (
//             <div>
//                 <form onSubmit={this.onSubmit}>
//                     <div class="h-screen bg-purple-400 flex justify-center items-center">
//                         <div class="absolute w-60 h-60 rounded-xl bg-purple-300 -top-5 -left-16 z-0 transform rotate-45 hidden md:block">
//                         </div>
//                         <div class="absolute w-48 h-48 rounded-xl bg-purple-300 -bottom-6 -right-10 transform rotate-12 hidden md:block">
//                         </div>
//                         <div class="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
//                             <div>
//                                 <h1 class="text-3xl font-bold text-center mb-4 cursor-pointer">Đổi Email</h1>
                               
//                             </div>
//                             <div class="space-y-4">
//                                 <input
//                                     placeholder="Nhập email hiện tại"
//                                     type="text"
//                                     required
//                                     value={this.state.currentPassword}
//                                     onChange={this.onChangeE1}
//                                     class="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
//                                 <input
//                                     placeholder="Nhập email mới"
//                                     type="text"
//                                     required
//                                     value={this.state.newPassword}
//                                     onChange={this.onChangeE2}
//                                     class="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
//                             </div>
//                             <div class="text-center mt-6">
//                                 <button type="submit" value="Edit" class="py-3 w-64 text-xl text-white bg-purple-400 rounded-2xl">Gửi</button>
//                                 </div>
//                         </div>
//                         <div class="w-40 h-40 absolute bg-purple-300 rounded-full top-0 right-12 hidden md:block"></div>
//                         <div
//                             class="w-20 h-40 absolute bg-purple-300 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block">
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         )
//     }
// }