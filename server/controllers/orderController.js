const expressAsyncHandler = require('express-async-handler')

const Order = require('../models/order.model')
const Notification = require('../models/notification.model')
const User = require('../models/user.model')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')

exports.getOrderContainUser = (req, res) => {
    Order.aggregate([
        {
            $lookup: //you can see at document
            {
                from: "users", // collection name in mongodb, not model
                localField: "_id", // field in current colection
                foreignField: "orderslist", // field at lookup colection
                as: "user" //you can set whatever name you want 
            },
        },
        {
            $unwind: "$user",
        },
    ])
        .then(orders => res.json(orders))
        .catch(err => res.status(400).json('Error: ' + err))
}
/* ---------------------------------- ADMIN --------------------------------- */
exports.getOrder = (req, res) => {
    console.log(req.params.id)
    Order.findById(req.params.id)
        .then(o => res.json(o))
        .catch(err => res.status(400).json('Error: ' + err))
}

exports.getAllOrders = async (req, res) => {
    Order.find()
        .then(orders => res.json(orders))
        .catch(err => res.status(400).json('Alo Error' + err))
}

exports.createOrder = (req, res) => {
    if (req.body.orderItems.length === 0) {
        res.status(400).send({ message: 'Cart is Empty!!' })
    } else {
        const order = new Order({
            orderItems: req.body.orderItems,
            shippingInfo: req.body.shippingInfo,
            // paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id  // get from token
        })
        order.save()
            .then(() => res.json(order))
            .catch(err => res.status(400).json('Error' + err))
        // order.save();
        //     .then(() => res.status(201).send({ message: 'New Order Created', order: order }))
        //     .catch(err => res.status(400).json('Error' + err))
        // res
        //     .status(201)
        //     .send({ message: 'New Order Created', order: order }); cái api này nó hđ ko e, tutor ngta hoat dong do 
    }


    // expressAsyncHandler(async (req, res) => {
    //     if (req.body.orderItems.length === 0) {
    //         res.status(400).send({ message: 'Cart is Empty!!' })
    //     } else {
    //         const order = new Order({
    //             orderItems: req.body.orderItems,
    //             shippingInfo: req.body.shippingInfo,
    //             // paymentMethod: req.body.paymentMethod,
    //             itemsPrice: req.body.itemsPrice,
    //             totalPrice: req.body.totalPrice,
    //             // user: req.user._id
    //         })
    //         order.save()
    //             .then(() => res.status(201).send({ message: 'New Order Created', order: order }))
    //             .catch(err => res.status(400).json('Error' + err))
    //         // order.save();
    //         //     .then(() => res.status(201).send({ message: 'New Order Created', order: order }))
    //         //     .catch(err => res.status(400).json('Error' + err))
    //         // res
    //         //     .status(201)
    //         //     .send({ message: 'New Order Created', order: order }); cái api này nó hđ ko e, tutor ngta hoat dong do 
    //     }
    // }
    // )


}

exports.updateOrderProcess = async (req, res) => {
    console.log(req.params.id)
    console.log(req.user._id)
    console.log(req.body.status)
    const order = await Order.findById(req.params.id)
        .then(order => {
            order.status = req.body.status // body lấy từ frontend 
            order.save()
                .then(() => {
                    // res.json("Order be updated by admin." + order)
                    let date_ob = new Date();

                    // current date
                    // adjust 0 before single digit date
                    let date = ("0" + date_ob.getDate()).slice(-2);

                    // current month
                    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

                    // current year
                    let year = date_ob.getFullYear();

                    // current hours
                    let hours = date_ob.getHours();

                    // current minutes
                    let minutes = date_ob.getMinutes();

                    // current seconds
                    let seconds = date_ob.getSeconds();

                    // prints date in YYYY-MM-DD format
                    console.log(year + "-" + month + "-" + date);

                    // prints date & time in YYYY-MM-DD HH:MM:SS format
                    console.log(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
                    let time = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
                    // let time = hours + ":" + minutes + ":" + seconds + " " + date + "-" + month + "-" + year

                    const notify = new Notification({
                        content: req.body.status,
                        type: 1,
                        time: time,
                        orderid: req.params.id,
                        user: order.user  // get from token
                    })
                    notify.save()
                        .then(() => res.json("Order be updated, notify created"))
                        .catch(err => res.status(400).json('Error' + err))
                })
                .catch(new AppError(err => res.status(400).json('Error: ' + err)))
        })
        .catch(err => res.status(400).json('Error: ' + err))
}


exports.deleteOrder = async (req, res) => {
    let userId = req.user._id
    const orders = await Order.find({ "user": userId })
    if (orders) {
        const order = Order.findByIdAndDelete(req.params.orderId)
            .then(() => res.json('Order is deleted'))
            .catch(err => res.status(400).json('Error: ' + err))
    }
}

// work
exports.getOrdersbyUserId = async (req, res) => {
    let userId = req.params.userId
    console.log(userId)
    const orders = await Order.find({ "user": userId })
    if (!orders) {
        res.json('Order with this user id do not exist.')
    }
    else {
        console.log(orders)
        res.json(orders)
    }

}

exports.getNewOrder = async (req, res) => {
    console.log('alo')

    const orders = await Order.find({ "status": "Tạo thành công" })
        .then(orders => res.json(orders))
        .catch(err => res.status(400).json('Alo Error' + err))
}

