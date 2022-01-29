import React, { Component } from 'react'
import userService from '../services/user.service'
import Loading from '../loading.component'
import axios from 'axios'
import authHeader from '../services/auth-header'
import UserPrivateSidebar from '../admin/users/sidebar-user-private.component'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import authService from '../services/auth.service'
import { Redirect } from 'react-router'
import sample from '../../assets/img/clouds_from_my_neighbor_totoro_by_itsendy_deb7t16-fullview.jpg'
import NavbarUser from '../admin/users/navbar-user.component'

export default class ProductDetail extends Component {
    constructor(props) {
        super(props)

        this.onFileChange = this.onFileChange.bind(this);
        this.inputOpenFileRef = React.createRef()
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onSubmitAvatar = this.onSubmitAvatar.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            user: {},
            userid: '',
            firstName: '',
            lastName: '',
            username: '',
            orderslist: '',
            role: '',
            address: '',
            phone: '',
            phoneSyntax: 0,
            avatar: '',
            isLoading: 1,


            shippingInfo: {},


            paymentMethod: "",
            isPaid: undefined,
            isDelivered: false,
            orderid: "",

            orderslist: [],
            orderItems: [],
            orderid: "",

            itemsPrice: 0,
            totalPrice: 0,
            userid: "",

            process: {},
            init: undefined,
            foreign: undefined,
            transport: undefined,
            complete: undefined,

            isCheck: undefined,
            waring: 0,
            currentUser: authService.getCurrentUser(),

            editOn: 0,

        }
    }

    componentDidMount() {
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
            this.setState({
                currentUser: currentUser,
            });
        }
        userService.getUser(this.props.match.params.id)
            .then(response => {
                this.setState({
                    user: response.data,
                    userid: response.data._id,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    username: response.data.username,
                    email: response.data.email,
                    role: response.data.role,
                    address: response.data.address,
                    phone: response.data.phone,
                    avatar: response.data.avatar,

                    isLoading: 0
                })
                console.log('object')
                console.log('response.data' + response.data)
            })
            .catch(err => {
                console.log(err);
            })

        userService.getOrdersbyUserId(this.props.match.params.id)
            .then(response => {
                this.setState({
                    orderslist: response.data,
                    shippingInfo: response.data.shippingInfo,


                    paymentMethod: response.data.paymentMethod,
                    isPaid: response.data.isPaid,
                    isCheck: response.data.isCheck,
                    orderid: response.data._id,

                    orderItems: response.data.orderItems,

                    itemsPrice: response.data.itemsPrice,
                    totalPrice: response.data.totalPrice,
                    userid: response.data.userid,
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
    onChangeUserName(u) {
        if (u.target.value === '') {
            this.setState({
                waring: 1
            })
        }
        this.setState({
            username: u.target.value,
        });
    }
    onChangeFirstName(u) {
        this.setState({
            firstName: u.target.value,
            editOn: 1
        });
    }

    onChangeLastName(u) {
        this.setState({
            lastName: u.target.value,
            editOn: 1
        });
    }

    onChangePhone(u) {
        this.setState({
            phone: u.target.value,
            editOn: 1
        });
    }

    onChangeAddress(u) {
        this.setState({
            address: u.target.value,
            editOn: 1
        });
    }

    onFileChange(e) {
        console.log('new avatar');
        this.setState({
            avatar: e.target.files[0],
        });
        console.log(this.state.avatar);
    }
    showOpenFileDlg = () => {
        this.inputOpenFileRef.current.click()
    }

    isVietnamesePhoneNumber = async () => {
        console.log('alo')
        const a = await /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/.test(this.state.phone);

        console.log(a)

        if (a === true) {
            console.log('object')
            console.log(this.state.phoneSyntax)
            this.setState({
                phoneSyntax: 0
            })
            console.log(this.state.phoneSyntax)
            return true
        }
        if (a === false) {
            console.log('false')
            this.setState({
                phoneSyntax: 1
            })
            // alert("message");
            return false;
        }
    }

    onSubmit = async (u) => {
        const check = await this.isVietnamesePhoneNumber()
        u.preventDefault();

        if (check === true) {
            console.log('true');
            const user = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                phone: this.state.phone,
                address: this.state.address,
            }
            console.log(user);
            axios.patch('http://localhost:5001/users/user/update-info/' + this.props.match.params.id, user, { headers: authHeader() })
                .then(res => {
                    console.log("res.data: " + res.data)
                    toast("Profile be edited!", {
                        type: "warning"
                    })

                    // window.location.reload();
                   
                },
                    error => {
                        console.log(error);
                        
                    })
        }
        else if (check === false) {
            console.log('object');
        }
    }

    onSubmitAvatar() {
        console.log(this.state.lastName);
        const formData = new FormData()

        formData.append('avatar', this.state.avatar)
        axios.patch('http://localhost:5001/users/user/update-info/avatar/' + this.props.match.params.id, formData, { headers: authHeader() })
            .then(res => {
                console.log("res.data: " + res.data)
                toast("Avatar be updated!", {
                    type: "warning"
                })
                window.location.reload();
            },
                error => {
                    console.log(error);
                })
    }
    render() {
        const { firstName, lastName, username, orderslist, email, isLoading, productname, shippingInfo, address, phone, phoneSyntax, user, currentUser, avatar, waring, alert } = this.state
        let orders = this.state.orderslist.map(function (order) {
            return { order };
        })

        if (!currentUser) return <Redirect to='/login' />
        return (
            currentUser &&
            <form >
                <div className="bg-like flex flex-row">
                    <UserPrivateSidebar user={user} />

                    <div class="px-16 py-5 bg-white  rounded-lg w-full overflow-hidden">
                        {/* <div class="relative">
                            <canvas class="w-full bg-gray-300 h-60" width="940" height="352"></canvas>
                            <div class="mb-8 -ml-13 w-full absolute bottom-0 left-0 z-10 transform translate-y-3/4 lg:w-auto lg:translate-x-1/2 flex justify-center">
                                <div onClick={() => console.log('edit avatar')} className="w-11 h-11 rounded-full absolute bg-gray-100 bg-opacity-95 ml-16 mt-20 p-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute stroke-current text-black text-opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </div>
                                <canvas onClick={this.showOpenFileDlg} class="bg-gray-400 rounded-full" width="120" height="120">
                                    <img src={`http://localhost:3000/assets/imgs/users/${avatar[0]}`} className="w-30 h-30 rounded-full"/>
                                    <input ref={this.inputOpenFileRef} va style={{ display: "none" }} type="file" name="avatar" className="h-full w-full" onChange={this.onFileChange} />
                                </canvas>
                            </div>
                        </div> */}



                        {/* Nav */}
                        <NavbarUser />

                        <div className="space-y-0.5">
                            <div class="justify-between w-36 px-12 bg-gray-100 mt-14 w-full font-mock px-5 py-8 text-black inrow">
                                <div>
                                    Thông tin cá nhân
                                </div>
                                {
                                    this.state.editOn ? (
                                        <a
                                            onClick={this.onSubmit}
                                            // type="submit"
                                            class="px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out">
                                            Cập nhật thông tin
                                        </a>
                                    ) : (
                                        <button type="button" class="px-6 py-2 border-2 border-gray-200 text-gray-550 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                                            Cập nhật thông tin
                                        </button>
                                    )
                                }


                                {/* <div className='space-x-1 inrow h-9 w-20 px-2 pl-3 ring-1 ring-gray-300 rounded-md'>
                                    <div><img src="/img/Create.png" className="h-5 w-5 stroke-current mt-2 text-icon" /></div>
                                    <input
                                        type="submit"
                                        value="Lưu"
                                        class="text-sm"
                                    />
                                </div> */}
                            </div>

                            {/* USer edit profile o day */}
                            <div>
                                <div className="bg-gray-100">
                                    <div class="pl-28 inrow w-full font-mock px-5 py-8 text-black space-x-10">
                                        <div>
                                            <div onClick={this.showOpenFileDlg} class="" width="120" height="120">
                                                {
                                                    !this.state.avatar ? (
                                                        <img src={sample} className="inline-block h-10 w-10 rounded-full ring-2 ring-white" />
                                                    ) : (
                                                        <img src={`http://localhost:3000/assets/imgs/users/${avatar}`} className="inline-block h-10 w-10 rounded-full ring-2 ring-white" />
                                                    )
                                                }
                                                <input ref={this.inputOpenFileRef} style={{ display: "none" }} type="file" name="avatar" className="" onChange={this.onFileChange} />
                                            </div>
                                            <div>
                                                <span onClick={this.onSubmitAvatar} className="text-sm text-indigo-500">Đổi Avatar</span>
                                            </div>
                                        </div>
                                        <div class="">
                                            <h1 class="inrow font-mock text-xl text-gray-700 mb-4">


                                                <div className='inrow space-x-2'>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={this.state.lastName}
                                                        onChange={this.onChangeLastName}
                                                        class="flex w-28 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block  shadow-sm sm:text-base border-gray-300 rounded-md"
                                                        placeholder="Họ.." />
                                                    <input
                                                        type="text"
                                                        required
                                                        value={this.state.firstName}
                                                        onChange={this.onChangeFirstName}
                                                        class="flex mt-1 focus:ring-indigo-500 focus:border-indigo-500 block  shadow-sm sm:text-base border-gray-300 rounded-md w-30"
                                                        placeholder="Tên.." />                                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                    </svg>
                                                </div>
                                            </h1>
                                        </div>
                                    </div>

                                    <div class="pl-28 inrow  bg-gray-100 w-full font-mock px-5 py-8 text-black">
                                        <div class="col-span-6 sm:col-span-3">
                                            <label for="first-name" class="block text-sm font-medium text-gray-700">Tên đăng nhập</label>
                                            <input
                                                type="text"
                                                required
                                                value={this.state.username}
                                                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-gray-300 rounded-md"
                                                placeholder="Tên đăng nhập" />
                                            {waring === 1 &&
                                                <div class="my-3 block  text-sm text-left text-red-600  bg-red-500 bg-opacity-10 border border-red-400 h-12 flex items-center p-4 rounded-md" role="alert">
                                                    Username không thể trống
                                                </div>
                                            }
                                        </div>
                                        <div class="incol col-span-6 ml-48 sm:col-span-3">
                                            <div>
                                                <label for="first-name" class="block text-sm font-medium text-gray-700">Số điện thoại</label>
                                                <div className='inrow space-x-2'>
                                                    <input placeholder="Thêm số điện thoại.." value={this.state.phone} onChange={this.onChangePhone} id="first-name" autocomplete="given-name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-gray-300 rounded-md" />
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                    </svg>
                                                </div>
                                            </div>
                                            {phoneSyntax === 1 &&
                                                <div class="my-3 block  text-sm text-left text-red-600  bg-red-500 bg-opacity-10 border border-red-400 h-12 flex items-center p-4 rounded-md" role="alert">
                                                    Số điện thoại không hợp lệ
                                                </div>
                                            }
                                        </div>

                                    </div>
                                    <div class="pl-28 inrow  bg-gray-100 w-full font-mock px-5 py-8 text-black">
                                        <div class="col-span-6 sm:col-span-3">
                                            <div className="incol space-x-3">
                                                <div>
                                                    <label for="first-name" class="block text-sm font-medium text-gray-700">Email</label>
                                                    <input type="text"
                                                        value={
                                                            email && email.replace(/(.{3})(.*)(?=@)/,
                                                                function (gp1, gp2, gp3) {
                                                                    for (let i = 0; i < gp3.length; i++) {
                                                                        gp2 += "*";
                                                                    } return gp2;
                                                                })
                                                        } id="first-name" autocomplete="given-name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-gray-300 rounded-md" />

                                                </div>
                                                <a href={`/user-view/change-email/` + user._id} className="text-blue-900 mr-10 text-sm">
                                                    Đổi Email
                                                </a>
                                            </div>
                                        </div>
                                        <div class="col-span-6 ml-48 sm:col-span-3">
                                            <div>
                                                <label for="first-name" class="block text-sm font-medium text-gray-700">Địa chỉ</label>
                                                <div className='inrow space-x-2'>
                                                    <input type="text" placeholder="Thêm địa chỉ..." value={this.state.address} onChange={this.onChangeAddress} id="first-name" autocomplete="given-name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-base border-gray-300 rounded-md" />
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="pl-28 inrow justify-between bg-gray-100 w-full font-mock px-5 py-8 text-black">



                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        )
    }

}




