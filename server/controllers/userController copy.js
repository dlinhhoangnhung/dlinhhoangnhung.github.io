const { AppBar } = require('@material-ui/core');
// const { roles } = require('../middlewares/roles')
const User = require('../models/user.model')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const { JWT_ACC_ACTIVATE, CLIENT_URL } = require('../config')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')
const crypto = require('crypto')

const transporter = nodemailer.createTransport(sendgridTransport({
  auth: { JWT_ACC_ACTIVATE }
}))
// exports.grantAccess = function (action, resource) {
//   return async (req, res, next) => {
//     try {
//       const permission = roles.can(req.role)[action](resource);
//       if (!permission.granted) {
//         return res.status(401).json({
//           error: "You don't have enough permission to perform this action"
//         });
//         console.log(permission)
//       }
//       next()
//     } catch (error) {
//       next(error)
//       console.log("grantAccess catch error" + error)
//     }
//   }
// }

// exports.allowIfLoggedin = async (req, res, next) => {
//   if (await req.user) {
//     next()
//   } else {
//     return res.status(402).json({
//       message: "You need to be logged in to access this route",
//     },
//     )
//     // req.flash('error', 'You needed to be logged in to visitz that page!');
//     // res.redirect('/login')
//   }
// }

exports.allowIfLoggedin = async (req, res, next) => {
  try {
    const user = res.locals.loggedInUser;
    if (!user)
      return res.status(402).json({
        message: "You need to be logged in to access this route",
      },
      );
    req.user = user;
    next();
  } catch (error) {
    next(error);
    console.log(" allowIfLoggedin catch error" + error)

  }
}

exports.getUsers = async (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('alo error' + err))
}


exports.getUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) return next(new Error('User does not exist'));
    res.status(200).json({
      data: user
    });
  } catch (error) {
    next(error)
    console.log(" getUser catch error" + error)

  }
}

exports.updateUser = async (req, res, next) => {
  try {
    const update = req.body
    const userId = req.params.userId;
    await User.findByIdAndUpdate(userId, update);
    const user = await User.findById(userId)
    res.status(200).json({
      data: user,
      message: 'User has been updated'
    });
  } catch (error) {
    next(error)
  }
}

exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    await User.findByIdAndDelete(userId);
    res.status(200).json({
      data: null,
      message: 'User has been deleted'
    });
  } catch (error) {
    next(error)
  }
}

exports.forgotPassword = async (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err)
    }
    const token = buffer.toString("hex")
    User.findOne({ email: req.body.email })
      .then(user => {
        if(!user){
          return res.status(422).json({error: "User with this email doesnt exists."})
        }
        user.resetToken = token
        user.expireToken = Date.now() + 3600000
        user.save().then((result) => {
          transporter.sendMail({
            to: user.email,
            from: "no-reply@guccdesis.com",
            subject: "reset password",
            html: `
              <h2>Please click on this link below to reset password</>
              <p>${CLIENT_URL}/reset-password/${token}</p>
            `
          })
          res.json({message:"Check your email"})
        })
      })
  })
}