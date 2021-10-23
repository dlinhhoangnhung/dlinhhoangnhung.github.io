import React, { useState } from "react"
import CheckoutSteps from "../checkout/CheckoutSteps"
import { useDispatch, useSelector } from "react-redux"
import { saveShippingAddress } from "../../redux/actions/cartActions"
import authService from "../services/auth.service"

export default function ShippingAddressScreen(props) {
    const cart = useSelector((state) => state.cart)
    const { shippingInfo } = cart
    // const [fullName, setFullName] = useState('')
    // const [phone, setPhone] = useState('')
    // const [address, setAddress] = useState('')

    const [fullName, setFullName] = useState(shippingInfo.fullName)
    const [phone, setPhone] = useState(shippingInfo.phone)
    const [address, setAddress] = useState(shippingInfo.address)
    const dispatch = useDispatch()
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ fullName, phone, address })
        )
        props.history.push('/placeorder')
    }


    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form onSubmit={submitHandler}>
                <div className="main" style={{ paddingTop: 10 }}>
                    <section className="signup">
                        <div className="container">
                            <div className="signup-content">
                                <div className="signup-form">
                                    <h3 className="form-title">Shipping Info</h3>
                                    <div className="form-group" style={{ paddingTop: '20px' }}>
                                        <label htmlFor="fullName">
                                            <i className="zmdi zmdi-account material-icons-name"></i>
                                        </label>
                                        <input
                                            type="text"
                                            id="fullName"
                                            placeholder="Enter full name"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            required
                                        ></input>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone">
                                            <i className="zmdi zmdi-email"></i>
                                        </label>
                                        <input
                                            type="number"
                                            id="phone"
                                            placeholder="Enter phone"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            required
                                        ></input>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="address">
                                            <i className="zmdi zmdi-email"></i>
                                        </label>
                                        <input
                                            type="text"
                                            id="address"
                                            placeholder="Enter address"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            required
                                        ></input>
                                    </div>

                                    {/* <div className="form-group form-button">
                                        <input
                                            type="submit"
                                            className="form-submit"
                                            value="Continue"
                                        />
                                    </div> */}

                                    <div>
                                        <label />
                                        <button className="primary" type="submit">
                                            Continue
                                        </button>
                                    </div>


                                </div>
                                <div className="signup-image">
                                    <figure>
                                        <img src="assets/imgs/shipinfo.jpg" alt="sing up image" />
                                    </figure>

                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </form >

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
    )
}
