import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { savePaymentMethod } from '../../redux/actions/cartActions'
import CheckoutSteps from '../checkout/CheckoutSteps'
import '../../payment.css'

export default function PaymentMethodScreen(props) {
    const [paymentMethod, setPaymentMehthod] = useState('Momo')
    const dispatch = useDispatch()
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        props.history.push('/placeorder')
    }
    return (
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            {/* <form className="form" onSubmit={submitHandler}>
                <div class="form-radio">
                    <div class="label-flex">
                        <label for="payment">Payment Mode</label>
                        <a href="#" class="form-link">Payment Detail</a>
                    </div>
                    <div class="form-radio-group">
                        <div class="form-radio-item">
                            <input type="radio" name="payment" id="cash" checked=""/>
                            <label for="cash">Cash</label>
                            <span class ="check"></span>
                        </div>
                        <div class="form-radio-item">
                            <input type="radio" name="payment" id="cheque"/>
                            <label for="cheque">Cheque</label>
                            <span class ="check"></span>
                        </div>
                        <div class="form-radio-item">
                            <input type="radio" name="payment" id="demand"/>
                            <label for="demand">Demand Draf</label>
                            <span class ="check"></span>
                        </div>
                    </div>
                </div>

            </form> */}
            
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Payment</h1>
                </div>
                <div>
                    <div>
                        <input
                            type="radio"
                            id="momo"
                            value="Momo"
                            name="paymentMethod"
                            required
                            onChange={(e) => setPaymentMehthod(e.target.value)}
                        ></input>
                        <label htmlFor="momo">Momo</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input
                            type="radio"
                            id="cod"
                            value="COD"
                            name="paymentMethod"
                            required
                            checked
                            onChange={(e) => setPaymentMehthod(e.target.value)}
                        ></input>
                        <label htmlFor="momo">COD</label>
                    </div>
                </div>
                <div>
                    <button className="primary" type="submit">Continue</button>
                </div>
            </form>
        </div>
    )
}
