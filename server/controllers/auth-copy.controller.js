const User = require("../models/user.model")
const Role = require("../models/role.model")
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../config')
const passport = require('passport')
const { Reddit } = require("@material-ui/icons")
const db = require("../models/index");

// CHUYEN SANG SYNTAX MOI, XOA ASYNC/AWAIT NEU CONTROLLER BI SAI THI DUNG LAI SYNTAX CU TU AUTH.COPY

/**
 * Register user
 */


 exports.userRegister = (req, role="user", res) => {
//  const userRegister = async (userInput, role, res) => {
  try {
      //Validate User
      let usernameNotTaken = validateUsername(userInput.username) //check data input and database by 'validateUsernam'
      if (!usernameNotTaken) { //if after checked not true, return message below
          return res.status(400).json({
              message: `Username already exists.`,
              success: false
          })
      }
      //Validate Email
      let emailNotTaken = validateEmail(userInput.email)
      if (!emailNotTaken) {
          return res.status(400).json({
              message: `Email already been used.`,
              success: false
          })
      }

      //Hash Password
      const password = bcryptjs.hash(userInput.password, 12)
      //Create a new user
      const newUser = new User({
          ...userInput,
          password,
          role
      })
    newUser.save()
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
 exports.userLogin = (userInput, res) => { //Chuyen sang syntax khac, neu nhu login bi loi, lay syntax cu~ tu auth.copy
// const userLogin = async (userInput, res) => {
    let { username, password } = userInput
    const user = User.findOne({ username })
    if (!user) {
        return res.status(404).json({
            message: `Username not be found. Invalid login credentials.`,
            success: false
        })
    }

    //check password
    let isMatch = bcryptjs.compare(password, user.password)
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


const validateUsername = username => {
    let u = User.findOne({ username }) // look for username in database
    return u ? false : true //if exists -> username already exists, return false
}

/**
 * Passport middleware - Check token or not
 */
//  exports.userAuth = passport.authenticate("jwt", { session: false })
// const userAuth = passport.authenticate("jwt", { session: false })

/**
 * Check role
 */
//Check role
exports.checkRole = roles => (req, res, next) => {
// const checkRole = roles => (req, res, next) => {
    // Check if the requesting user is marked as admin in database
    if (req.user.role == "admin") {
        return next()
    }
    if (req.user.role == "user") {
        return res.json("You are not allowed to access here.")
        // return res.writeHead(400, { 'Location': 'http://google.com' }, "")
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
