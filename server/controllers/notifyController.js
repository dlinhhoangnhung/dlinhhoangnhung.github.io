const Order = require('../models/order.model')
const Notification = require('../models/notification.model')
const User = require('../models/user.model')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

exports.getContainOrder = async (req, res) => {
    let id = mongoose.Types.ObjectId(req.user._id);
    await Notification.aggregate([
        { $match: { user: ObjectId(req.user._id) } },
        {
            $lookup: //you can see at document
            {
                from: "orders", // collection name in mongodb, not model
                localField: "orderid", // field in current colection
                foreignField: "_id", // field at lookup colection
                as: "order" //you can set whatever name you want 
            },
        },
        {
            $unwind: "$order",
        },
        // { $match: { user: id } },
    ])
        .then(async noti => {
            console.log(noti)
            console.log(id)

            res.json(noti)

        })
        .catch(err => res.status(400).json('Error: ' + err))
}


exports.getAllNoti = async (req, res) => {
    let userId = req.user._id
    const notification = await Notification.find()
        .then((noti) => res.json(noti))
        .catch(new AppError(err => res.status(400).json('Error: ' + err)))
}

exports.getForUser = async (req, res) => {
    let userId = req.user._id
    const notification = await Notification.find({ "user": userId })
        .then((noti) => res.json(noti))
        .catch(new AppError(err => res.status(400).json('Error: ' + err)))
    // if (notification) {
    //     const unRead = await notification.find({ "isRead": false })
    //     if (!unRead) {
    //         res.json('Have no new notification')
    //     }
    //     else {
    //         console.log(unRead)
    //         res.json(unRead)
    //     }
    // }
}

exports.getForUserUnread = async (req, res) => {
  try{
    let userId = req.user._id
    const notification = await Notification.find({ "user": userId })
    if (notification) {
        const unRead = await notification.find({ "isRead": false })
        if (!unRead) {
            res.json('Have no new notification')
        }
        else {
            console.log(unRead)
            res.json(unRead)
        }
    }
  }catch(err){
      console.log(err);
  }
}

exports.notiIsRead = async (req, res) => {
    await Notification.findById(req.params.id)
        .then(noti => {
            noti.isRead = true // body lấy từ frontend 
            noti.save()
                .then(() => res.json("Noti is read" + noti))
                .catch(new AppError(err => res.status(400).json('Error: ' + err)))
        })
        .catch(err => res.status(400).json('Error: ' + err))
}