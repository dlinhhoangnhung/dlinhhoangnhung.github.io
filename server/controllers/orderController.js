const expressAsyncHandler = require('express-async-handler')

const Order = require('../models/order.model')
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

//not work
exports.getOrdersbyUserId = async (req, res) => {
    let userId = req.params.userId
    console.log(userId)
    const order = await Order.find({ "user": userId })
    if (!order) {
        res.json('Order with this user id do not exist.')
    }
    else {
        console.log(order)
        res.json(order)
    }

}

exports.getNewOrder = async (req, res) => {
    console.log('alo')

    const orders = await Order.find({ "isChecked": false })
        .then(orders => res.json(orders))
        .catch(err => res.status(400).json('Alo Error' + err))
}

exports.checkedOrder = async (req, res) => {
    await Order.findById(req.params.id)
        .then(order => {
            order.isChecked = true
            order.process.processing = true
            order.save()
                .then(() => res.json("Order be checked. " + order))
                .catch(new AppError(err => res.status(400).json('Error: ' + err)))

        })
        .catch(err => res.status(400).json('Error: ' + err))
}



exports.deleteOrder = (req, res) => {
    Order.findByIdAndDelete(req.params.id)
        .then(() => res.json('Product is deleted'))
        .catch(err => res.status(400).json('Error: ' + err))
}