const router = require('express').Router()
let Customer = require('../models/customer.model')
let Order = require('../models/order.model')

router.route('/').get((req, res) => {
    Customer.aggregate([
        {    
            $lookup: //you can see at document
            {
                from: "orders", // collection name in mongodb, not model
                localField: "_id", // field in current colection
                foreignField: "cusid", // field at lookup colection
                as: "orders" //you can set whatever name you want 
            },
        } 
    ])
        .then(customers => res.json(customers))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const name = req.body.name
    const insta = req.body.insta
    const phone = req.body.phone
    const address = req.body.address

    const newCustomer = new Customer({
        name,
        insta,
        phone,
        address
    })

    newCustomer.save()
        .then(() => res.json('Customer be added'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').get((req, res) => {
    Customer.findById(req.params.id)
        .then(customer => res.json(customer))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').delete((req, res) => {
    Customer.findByIdAndDelete(req.params.id)
        .then(() => res.json('Customer is deleted'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/update/:id').post((req, res) => {
    Customer.findById(req.params.id)
        .then(customer => {
            customer.name = req.body.name
            customer.insta = req.body.insta
            customer.phone = req.body.phone
            customer.address = req.body.address

            customer.save()
                .then(() => res.json('Updated successfully!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})


module.exports = router