import React, { useState } from "react"
import CheckoutSteps from "../checkout/CheckoutSteps"
import { useDispatch, useSelector } from "react-redux"
import { saveShippingAddress } from "../../redux/actions/cartActions"
import authService from "../services/auth.service"
import Navbar from "../Navbar"

export default function ShippingAddressScreen(props) {
    const user = useSelector((state) => state.getUserSignin.userInfo)
    console.log(user)
    const cart = useSelector((state) => state.cart)
    const { shippingInfo } = cart
    const [fullName, setFullName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')

    // const [fullName, setFullName] = useState('shippingInfo.fullName')
    // const [phone, setPhone] = useState(shippingInfo.phone)
    // const [address, setAddress] = useState(shippingInfo.address)
    const dispatch = useDispatch()
    const submitHandler = async (e) => {
        const a = await /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(phone);
        if (a === true) {
            if (fullName === '' || address === '') {
                setPhoneSyntax(1)
            }
            else {
                e.preventDefault()
                dispatch(saveShippingAddress({ fullName, phone, address })
                )
                props.history.push('/user-info/placeorder')
            }
        }
        else {
            setPhoneSyntax(1)
        }


    }
    const [phoneSyntax, setPhoneSyntax] = useState(0)
    // function phonenumber(inputtxt) {
    //     (84 | 0[3 | 5 | 7 | 8 | 9]) + ([0 - 9]{ 8 }) \b
    //     var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    //     if (inputtxt.value.match(phoneno)) {
    //         return true;
    //     }
    //     else {
    //         alert("message");
    //         return false;
    //     }
    // }

    const isVietnamesePhoneNumber = async () => {
        console.log('alo')
        const a = await /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(phone);
        console.log(a)

        if (a === true) {
            console.log('object')
            console.log(phoneSyntax)
            // setPhone(number)
            return true
        }
        if (a === false) {
            console.log('false')
            setPhoneSyntax(1)
            alert("message");
            return false;
        }
    }
    console.log(user)

    return (
        <div className="h-screen incol space-y-10">
            <Navbar />
            <CheckoutSteps step1 step2></CheckoutSteps>
            <div className="leading-loose flex justify-center">
                <form x class="max-w-xl w-1/3  m-4 p-10 bg-white rounded shadow-xl">
                    <p class="text-gray-800 text-xl  font-medium">Thông tin vận chuyển</p>
                    <div class="mt-6">
                        <label class="block text-sm text-gray-00" for="cus_name">Họ Tên</label>
                        <input
                            type="text"
                            id="fullName"
                            placeholder="Nhập họ tên"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" />
                    </div>
                    <div class="mt-2">
                        <label class="block text-sm text-gray-600" for="cus_email">Địa chỉ</label>
                        <input
                            type="text"
                            id="address"
                            placeholder="Nhập địa chỉ chính xác.."
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" />
                    </div>
                    <div class="inline-block mt-2 w-1/2 pr-1">
                        <label class=" block text-sm text-gray-600" for="cus_email">Số điện thoại</label>
                        <input
                            id="phone"
                            placeholder="Enter phone"
                            value={user.phone && user.phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" />
                        {phoneSyntax === 1 &&
                            // <div className="text-sm w-full text-red-600">

                            // </div>
                            <div class="my-3 block  text-sm text-left text-red-600  bg-red-500 bg-opacity-10 border border-red-400 h-12 flex items-center p-4 rounded-md" role="alert">
                                Số điện thoại không hợp lệ hoặc thông tin bị trống
                            </div>
                        }
                    </div>

                    {/* <p class="mt-4 text-gray-800 font-medium">Payment information</p> */}

                    <div class="mt-3">
                        <div onClick={submitHandler} class="px-4 py-1 w-1/3 text-white font-light tracking-wider bg-gray-900 rounded" type="submit">Xác nhận</div>
                    </div>
                </form>

                {/* <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Shipping Address</h1>
                </div>
                <div>
                    <label htmlFor="fullName">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        placeholder="Enter full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        placeholder="Enter address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="phone">SDT</label>
                    <input
                        type="number"
                        id="phone"
                        placeholder="Enter phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    ></input>
                </div>
                
                
                <div>
                    <label />
                    <button className="primary" type="submit">
                        Continue
                    </button>
                </div>
            </form> */}
            </div>
        </div>
    )
}


// {/* <form onSubmit={submitHandler}>
// <div className="main" style={{ paddingTop: 10 }}>
//     <section className="signup">
//         <div className="container">
//             <div className="signup-content">
//                 <div className="signup-form">
//                     <h3 className="form-title">Shipping Info</h3>
//                     <div className="form-group" style={{ paddingTop: '20px' }}>
//                         <label htmlFor="fullName">
//                             <i className="zmdi zmdi-account material-icons-name"></i>
//                         </label>
//                         <input
//                             type="text"
//                             id="fullName"
//                             placeholder="Enter full name"
//                             value={fullName}
//                             onChange={(e) => setFullName(e.target.value)}
//                             required
//                         ></input>
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="phone">
//                             <i className="zmdi zmdi-email"></i>
//                         </label>
//                         <input
//                             type="number"
//                             id="phone"
//                             placeholder="Enter phone"
//                             value={phone}
//                             onChange={(e) => setPhone(e.target.value)}
//                             required
//                         ></input>
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="address">
//                             <i className="zmdi zmdi-email"></i>
//                         </label>
//                         <input
//                             type="text"
//                             id="address"
//                             placeholder="Enter address"
//                             value={address}
//                             onChange={(e) => setAddress(e.target.value)}
//                             required
//                         ></input>
//                     </div>

//                     {/* <div className="form-group form-button">
//                         <input
//                             type="submit"
//                             className="form-submit"
//                             value="Continue"
//                         />
//                     </div> */}

//                     <div>
//                         <label />
//                         <button className="primary" type="submit">
//                             Continue
//                         </button>
//                     </div>


//                 </div>
//                 <div className="signup-image">
//                     <figure>
//                         <img src="assets/imgs/shipinfo.jpg" alt="sing up image" />
//                     </figure>

//                 </div>
//             </div>
//         </div>
//     </section>

// </div>
// </form > */}