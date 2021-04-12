const router = require('express').Router()
let OrderDetail = require('../models/order-detail.model')

router.route('/').get((req, res) => {
    OrderDetail.aggregate([
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
            $lookup: //you can see at document
            {
                from: "products", // collection name in mongodb, not model
                localField: "productid", // field in current colection
                foreignField: "_id", // field at lookup colection
                as: "product" //you can set whatever name you want 
            },
        },
        {
            "$unwind": { // get single value if array have one
                "path": "$order"
            }
        }, 
        {   
            "$unwind": {
                "path": "$product"
            }
        }
    ])
        .then(ordersdetail => res.json(ordersdetail))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const orderid = req.body.orderid
    const productid = req.body.productid
    const quantity = req.body.quantity
    const price = req.body.price

    const newOrderDetail = new OrderDetail({
        orderid,
        productid,
        quantity,
        price
    })

    newOrderDetail.save()
        .then(() => res.json('Order Detail be added'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').get((req, res) => {
    OrderDetail.findById(req.params.id)
        .then(orderdetail => res.json(orderdetail))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').delete((req, res) => {
    OrderDetail.findByIdAndDelete(req.params.id)
        .then(() => res.json('Order Detail is deleted'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/update/:id').post((req, res) => {
    OrderDetail.findById(req.params.id)
        .then(orderdetail => {
            orderdetail.orderid = req.body.orderid
            orderdetail.productid = req.body.productid
            orderdetail.quantity = req.body.quantity
            orderdetail.price = req.body.price

            orderdetail.save()
                .then(() => res.json('Updated successfully!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})
module.exports = router