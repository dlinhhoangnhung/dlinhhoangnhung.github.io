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
            return next(new AppError('Password does not match. Invalid login credentials.', 400))


        //Signin the token and issue it  to  the user
        let token = jwt.sign({
            user_id: user._id,
            role: user.role,
            username: user.username,
            password: user.password
        }, SECRET, { expiresIn: "1 day" })

        let result = { //  res to client
            id: user._id,
            username: user.username,
            role: user.role,
            email: user.email,
            avatar: user.avatar,
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

//error

const changePassword = async (req, res) => {
    console.log('aloS  ')
    console.log(req.body)

    try {
        const current = req.body.currentPassword
        const newPassword = req.body.newPassword
        const user =  User.findOne({ "_id" : req.params.userId})
        //check password
        if (user) {
            let validPassword = await validatePassword(current, user.password)
            if (!validPassword)
                res.json('Password is wrong. Try again', 400)
            else {
                const password = await bcryptjs.hash(newPassword, 12)
                user.updateOne({ $set: { password: password } })
                    .then(() => res.json("Password has been changed. " + user))
                    .catch(new AppError(err => res.status(400).json('Error: ' + err)))
            }
        }
    } catch (err) {
        console.log(err)
    }

}


/**
 * Passport middleware
 */
const userAuth = passport.authenticate("jwt", { session: "false" })

/**
 * Check role
 */


const checkRole = roles => async (req, res, next) => {
    console.log('checkRole: ' + req.user.role)
    console.log('token id  ' + req.user._id)
    const idToken = req.user._id // from token
    const user = await User.findById(idToken);
    if (user) {
        if (user.role === "admin") {
            return next()
        }
        if (user.role === "user") {
            return res.json("Permission Request: You are not allowed to access here.")
            // return res.writeHead(400, { 'Location': 'http://google.com' }, "")
        }
    }

    // if (req.user.role ===  "admin") {
    //     return next()
    // }
    // if (req.user.role === "user") {
    //     return res.json("You are not allowed to access here.")
    //     // return res.writeHead(400, { 'Location': 'http://google.com' }, "")
    // }
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
    serializeUser,
    changePassword
}