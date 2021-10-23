const { AppBar } = require('@material-ui/core');
// const { roles } = require('../middlewares/roles')
const User = require('../models/user.model')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const { JWT_ACC_ACTIVATE, CLIENT_URL } = require('../config')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const { SECRET } = require('../config');
const { func } = require('prop-types');
const _ = require('lodash')
const bcryptjs = require('bcryptjs')
const AppError = require('../utils/appError')

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'guccdesis@gmail.com',
    pass: 'Guccdesis123'
  }
})
transporter.verify().then(console.log).catch(console.error);

exports.forgotPassword = async (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err)
    }
    const token = buffer.toString("hex")
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(422).json({ error: "User with this email doesnt exists." })
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
          res.json({ message: "Check your email" })
        })
      })
  })
}

exports.resetPassword = async (req, res) => {
  const sentToken = req.body.token
  // const newPass = await bcryptjs.hash(req.body.password, 12) 

  User.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
    .then(user => {
      if (!user) {
        return res.status(422).json({ error: "Try again session expired" })
      }
      bcryptjs.genSalt(12, (err, salt) => {
        bcryptjs.hash(req.body.password, salt, (err, hash) => {
          if (err) {
            throw err
          } else {
            user.password = hash;
            user.resetToken = undefined
            user.expireToken = undefined
            user.save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          }
        });
      });

      // hashPassword(newPass, 12).then(hashedpassword => {
      //   user.password = newPass
      //   user.resetToken = undefined
      //   user.expireToken = undefined
      //   user.save().then((saveduser) => {
      //     res.json({ message: "password update successfully" })
      //   })
      // })
    }).catch(err => {
      console.log(err)
    })
}
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

exports.updateUser = (req, res) => {
  console.log("update user run")
  console.log(req.user._id)
  console.log(req.body)

  User.updateOne(
    { _id: req.user._id },
    { $addToSet: { orderslist: req.body.orderslist } },
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
}


exports.findOrdersbyUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) return next(new Error('User does not exist'));
    res.status(200).json({
      data: user.orderslist
    });
  } catch (error) {
    next(error)
    console.log(" getUser catch error" + error)

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

