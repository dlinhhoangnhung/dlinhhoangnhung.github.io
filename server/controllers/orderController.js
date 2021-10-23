const expressAsyncHandler = require('express-async-handler')

const Order = require('../models/order.model')
const User = require('../models/user.model')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')

exports.getOrderByUser = (req, res) => {
    Order.aggregate([
        {    
            $lookup: //you can see at document
            { 
                from: "users", // collection name in mongodb, not model
                localField: "_id", // field in current colection
                foreignField: "orderslist", // field at lookup colection
                as: "orders" //you can set whatever name you want 
            },
        } 
    ])
        .then(orders => res.json(orders))
        .catch(err => res.status(400).json('Error: ' + err))
}
/* ---------------------------------- ADMIN --------------------------------- */
exports.getOrder = (req, res) => {
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
            .then(() => res.status(201).send({ message: 'New Order Created', order: order }))
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

exports.getOrderCreateByUser = (req, res) => {
    Order.findById(req.params.cusid)
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err))
}



exports.deleteOrder = (req, res) => {
    Order.findByIdAndDelete(req.params.id)
        .then(() => res.json('Product is deleted'))
        .catch(err => res.status(400).json('Error: ' + err))
}