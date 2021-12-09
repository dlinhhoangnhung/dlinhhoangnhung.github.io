import validator from 'validator'
import React, { useState } from "react";
import RegisterScreen from './screens/registerScreen';

const Register = () => {

    const [emailError, setEmailError] = useState('')
    const validateEmail = (e) => {
        var email = e.target.value

        if (validator.isEmail(email)) {
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (re) {
                setEmailError('Valid Email :)')
            }
        } else {
            setEmailError('Enter valid Email!')
        }
    }

    return (
        <RegisterScreen />
    );
}

export default Register