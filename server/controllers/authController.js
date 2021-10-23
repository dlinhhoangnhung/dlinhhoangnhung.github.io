const User = require("../models/user.model")
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { SECRET, JWT_SECRET } = require('../config')
const passport = require('passport')
// const { Reddit } = require("@material-ui/icons")
const { Redirect } = require("react-router")
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const jwt_decode = require("jwt-decode");
const { findById } = require("../models/user.model")
const { findByRole } = require("@testing-library/dom")

async function hashPassword(password) {
    return await bcryptjs.hash(password, 12);
}

async function validatePassword(plainPassword, hashedPassword) {
    return await bcryptjs.compare(plainPassword, hashedPassword);
}

const validateUsername = async username => {
    let u = await User.findOne({ username }) // look for username in database
    return u ? false : true //if exists -> username already exists, return false
}

const validateEmail = async email => {
    let e = await User.findOne({ email })
    return e ? false : true
    
}

/**
 * Register user
 */

const register = catchAsync(
    async (req, role, res) => {
        try {
            //Validate User
            let usernameNotTaken = await validateUsername(req.username) //check data input and database by 'validateUsernam'
            if (!usernameNotTaken) { //if after checked not true, return message below
                return res.status(400).json({
                    message: `Username already exists.`,
                    success: false
                })
            }
            //Validate Email
            var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

            let emailNotTaken = await validateEmail((req.email).toLowerCase())
            if (!emailNotTaken) {
                return res.status(400).json({
                    message: `Email already been used.`,
                    success: false
                })
            }

            //Hash Password
            const password = await bcryptjs.hash(req.password, 12)
            //Create a new user
            const newUser = new User({
                ...req,
                password,
                role
            })
            await newUser.save()
            return res.status(201).json( {
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
)

/**
 *User loggin
 */
const login = async (req, res, next) => {
    try {
        let { username, password } = req.body
        const user = await User.findOne({ username })
        if (!user) {
            // return res.status(404).json({
            //     message: `Username not be found. Invalid login credentials.`,
            //     success: false
            // })
            return next(new AppError('Username not be found. Invalid login credentials.', 400))
        }

        //check password
        let validPassword = await validatePassword(password, user.password)
        if (!validPassword)
            // return next(
            //     res.status(403).json({
            //         message: `Incorrect password.`,
            //         success: false
            //     })
            // )
            return next(new AppError('Username not be found. Invalid login credentials.', 400))


        //Signin the token and issue it  to  the user
        let token = jwt.sign({
            user_id: user._id,
            role: user.role,
            username: user.username,
            password: user.password
        }, SECRET, { expiresIn: "1 day" })

        let result = { //  res to client
            // id: user._id,
            username: user.username,
            role: user.role,
            email: user.email,
            token: `Bearer ${token}`,
            expiresIn: 168
        }
        console.log(token)

        await User.findByIdAndUpdate(user._id, { token })
        return res.status(200).json({
            ...result,
            message: "Succeed login.",
            success: true
        })
    } catch (error) {
        next(error);
    }
}



/**
 * Passport middleware
 */
const userAuth = passport.authenticate("jwt", { session: "false" })

/**
 * Check role
 */


const checkRole = roles => (req, res, next) => {
    // Check if the requesting user is marked as admin in database

    // const decoded = jwt_decode(req.header('Authorization'))
    // const idFromToken = (decoded.user_id)
    // const userCheck = findByRole(idFromToken)
    // console.log(userCheck)
    // if (!userCheck) {
    //     console.log(userCheck)
    // }
    // else {
    //     if (userCheck.role == "admin") {
    //         return next()
    //     }
    //     if (userCheck.role == "user") {
    //         return res.json("You are not allowed to access here.")
    //         // return res.writeHead(400, { 'Location': 'http://google.com' }, "")
    //     }
    //     else {
    //         console.log(userCheck)

    //         return res.status(401).json({
    //             message: "Can't check role.",
    //             success: false
    //         },
    //         )
    //     }
    // }

    if (req.user.role == "admin") {
        return next()
    }
    if (req.user.role == "user") {
        return res.json("You are not allowed to access here.")
        // return res.writeHead(400, { 'Location': 'http://google.com' }, "")
    }
    else {
        return res.status(401).json({
            message: "Can't check role.",
            success: false
        })
    }
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
    login,
    register,
    serializeUser
}