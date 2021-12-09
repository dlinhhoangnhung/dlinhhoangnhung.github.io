// const { AppBar } = require('@material-ui/core');
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
const { profile } = require('console')
const multer = require('multer')
const multerStorage = multer.memoryStorage();
const catchAsync = require('../utils/catchAsync')
const sharp = require('sharp')

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'guccdesis@gmail.com',
    pass: 'Guccdesis123'
  }
})
transporter.verify().then(console.log).catch(console.error);


const multerFilter = (req, file, cb) => { // filter if !image
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new AppError("Please upload only images.", false));
  }
};

const upload = multer({
  storage: multerStorage, //multer storage save file 
  fileFilter: multerFilter
})


exports.uploadAvatar = upload.single('avatar')

exports.resizeAvatar = catchAsync(async (req, res, next) => {
  console.log(req.file)
  req.body.avatar = `user-${Date.now()}-avatar.jpeg`
  await sharp(req.file.buffer)
    .resize(2000, 1300)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`../public/assets/imgs/users/${req.body.avatar}`)
  next()
})

async function hashPassword(password) {
  return await bcryptjs.hash(password, 12);
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
            user.password = hash;  // chua hash dươc mat khau reset
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

exports.getUserContainOrder = async (req, res) => {
  User.aggregate([
    {
      $lookup: //you can see at document
      {
        from: "orders", // collection name in mongodb, not model
        localField: "_id", // field in current colection
        foreignField: "user", // field at lookup colection
        as: "orderItem" //you can set whatever name you want 
      },
    },
    {
      $unwind: "$orderItem",
    },
  ])
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err))
}

exports.getUser = async (req, res, next) => {
  try {
    const paramsId = req.params.userId;
    console.log(paramsId)

    const tokenId = req.user._id

    console.log(tokenId)

    const getUserFromIdToken = await User.findById(tokenId);
    if (tokenId == paramsId) {
      const user = await User.findById(paramsId);
      if (!user) return next(new Error('User does not exist'));
      res.json(user)

     
    }
   
    // if (tokenId !== paramsId) {
    //   console.log('ko')
    //   if (getUserFromIdToken.role === "admin") {
    //     console.log('111')
    //     await User.findById(paramsId)
    //       // .then(user => res.json(user))
    //       .then((user) => res.json(user))
    //       .catch(err => res.status(400).json('Error: ' + err))
    //   } else return next(new Error('You are not allowed to access another user profile or the user do not exist.'))
    // }
    // else {
    //   const user = await User.findById(paramsId);
    //   if (!user) return next(new Error('User does not exist'));
    //   res.json({
    //     data: user
    //   });
    // }

  } catch (error) {
    next(error)
    console.log(" getUser catch error" + error)

  }
}

//user order
exports.updateUserOrder = (req, res) => {
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

// update information
exports.updateUser = async (req, res) => {
  await User.updateOne(
    User.findById(req.params.userId),
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        address: req.body.address,
        phone: req.body.phone,
        avatar: req.body.avatar,
      },
    })
    .then(() => res.json("User be updated."))
    .catch(new AppError(err => res.status(400).json('Error: ' + err)))
  // let u = await User.findOne({ '_id': req.params.userId }) // không đc mang ra đây kiểm tra vẫn ko đc
  // console.log('user:' + u)
  // User.findById(req.params.userId)
  //   .then(user => { //Khúc này
  //     user.firstName = req.body.firstName // Kiểm tra khúc này 
  //     console.log(req.body.firstName)
  //     user.lastName = req.body.lastName
  //     user.username = req.body.username
  //     user.address = req.body.address
  //     user.phone = req.body.phone

  //     user.update()
  //       .then(() => res.json("User be updated. \n" + user))
  //       .catch(new AppError(err => res.status(400).json('Error: ' + err)))

  //   })
  //   .catch(err => res.status(400).json('Error: ' + err))
}

exports.changeEmail = async (req, res) => {
  console.log('aloS  ')
  const current = req.body.currentEmail
  const newEmail = req.body.newEmail

  console.log('emailInput  ' + current)
  if (current && newEmail) {
    const user = await User.findById(req.params.userId)
    const email = user.email
    console.log('object ' + email)
    if (user.email === current) {
      user.updateOne({ $set: { email: newEmail } })
        .then(() => res.json("Email has been changed. " + user))
        .catch(new AppError(err => res.status(400).json('Error: ' + err)))
    }
    else {
      res.json("Failed: Email do not match. Try again.")
    }
  }
  else {
    res.json("Email undefined. Send request again.")
  }

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

