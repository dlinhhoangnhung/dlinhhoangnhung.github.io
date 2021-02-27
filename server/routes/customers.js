const router = require('express').Router()
let Customer = require('../models/customer.model')

router.route('/').get((req, res) => {
    Customer.find()
        .then(customer => res.json(customer))
        .catch(err => res.status(400).json('Error: ' +err))
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
        .catch(err => res.status(400).json('Error: ' +err))
})
router.route('/:id').get((req, res) => {
    Customer.findById(req.params.id)
        .then(customer => res.json(customer))
        .catch(err => res.status(400).json('Error: ' +err))
})
module.exports = router