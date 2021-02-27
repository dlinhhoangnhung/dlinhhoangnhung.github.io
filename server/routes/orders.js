const router = require('express').Router()
const { Mongoose } = require('mongoose')
let Order = require('../models/order.model')

router.route('/').get((req, res) => {
    Order.find()
        .then(orders => res.json(orders))
        .catch(err => res.status(400).json('Error' + err))
})

router.route('/add').post((req, res) => {
    const cusid = req.body.cusid
    const amount = req.body.amount
    const ship_address = req.body.ship_address
    const status = req.body.status
    const isDeleted =  req.body.isDeleted
    
    console.log(req);
    const newOrder = new Order({
        cusid,
        amount,
        ship_address,
        status,
        isDeleted
    })

    newOrder.save()
        .then(() => res.json('Order be added'))
        .catch(err => res.status(400).json('Error' + err))
})

router.route('/:id').get((req, res) => {
    Order.findById(req.params.id)
        .then(order => res.json(order))
        .catch(err => res.status(400).json('Error: ' +err))
})

router.route('/:id').delete((req, res) => {
    Order.findByIdAndDelete(req.params.id)
        .then(() => res.json('Order is deleted'))
        .catch(err => res.status(400).json('Error: ' +err))
})

router.route('/update/:id').post((req, res) => {
    Order.findById(req.params.id)
        .then(order => {
            order.cusid = req.body.cusid
            order.amount = req.body.amount
            order.ship_address = req.body.ship_address
            order.status = req.body.status
            order.isDeleted = req.body.isDeleted

            order.save()
                .then(() => res.json('Updated successfully!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' +err))
})
module.exports = router 