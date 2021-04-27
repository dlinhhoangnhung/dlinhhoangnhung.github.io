const User = require("../models/user.model")
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../config')
const passport = require('passport')
const { Reddit } = require("@material-ui/icons")
const { Redirect } = require("react-router")

/**
 * Register user
 */

const userRegister = async (userInput, role, res) => {
    try {
        //Validate User
        let usernameNotTaken = await validateUsername(userInput.username) //check data input and database by 'validateUsernam'
        if (!usernameNotTaken) { //if after checked not true, return message below
            return res.status(400).json({
                message: `Username already exists.`,
                success: false
            })
        }
        //Validate Email
        let emailNotTaken = await validateEmail(userInput.email)
        if (!emailNotTaken) {
            return res.status(400).json({
                message: `Email already been used.`,
                success: false
            })
        }

        //Hash Password
        const password = await bcryptjs.hash(userInput.password, 12)
        //Create a new user
        const newUser = new User({
            ...userInput,
            password,
            role
        })
        await newUser.save()
        return res.status(201).json({
            message: "Register is success.",
            success: true
        })
    } catch (err) {
        //Implement logger function (winston)
        return res.status(500).json({
            message: "Unable to create your account.",
            success: false
        })
    }
}

/**
 *User loggin
 */
const userLogin = async (userInput, res) => {
    let { username, password } = userInput
    const user = await User.findOne({ username })
    if (!user) {
        return res.status(404).json({
            message: `Username not be found. Invalid login credentials.`,
            success: false
        })
    }

    //Check role

    // if (user.role != "user") {
    //     // return res.status(404).json({
    //     //     message: `Please make sure your request match with your role`,
    //     //     success: false
    //     // })
    //     res.redirect('/admin')
    // }
    // user exists and go right role
    //check password
    let isMatch = await bcryptjs.compare(password, user.password)
    if (isMatch) {
        //Signin the token and issue it  to  the user
        let token = jwt.sign({
            user_id: user._id,
            role: user.role,
            username: user.username,
            password: user.password
        }, SECRET, { expiresIn: "7 days" })

        let result = {
            username: user.username,
            role: user.role,
            email: user.email,
            token: `Bearer ${token}`,
            expiresIn: 168
        }
        console.log(token)
        return res.status(200).json({
            ...result,
            message: "Succeed login.",
            success: true
        })

    } else {
        return res.status(403).json({
            message: `Incorrect password.`,
            success: false
        })
    }
}

const validateUsername = async username => {
    let u = await User.findOne({ username }) // look for username in database
    return u ? false : true //if exists -> username already exists, return false
}

/**
 * Passport middleware
 */
const userAuth = passport.authenticate("jwt", { session: false })

/**
 * Check role
 */
const checkRole = roles => (req, res, next) => {
    // Check if the requesting user is marked as admin in database
    if (req.user.role == "admin") {
        return next()
    }
    if (req.user.role == "user") {
        return res.json("You are not allowed to access here.")
    }
    else{
        return res.status(401).json({
            message: "Unauthorized",
            success: false
        })
    }
}

const validateEmail = async email => {
    let e = await User.findOne({ email })
    return e ? false : true
}

const serializeUser = user => {
    return {
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        id: user._id,
        updateAt: user.updateAt,
        createdAt: user.createdAt
    }
}
module.exports = {
    checkRole,
    userAuth,
    userLogin,
    userRegister,
    serializeUser
}