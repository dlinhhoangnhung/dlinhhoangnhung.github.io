const router = require('express').Router()
const { Mongoose } = require('mongoose')
let Product = require('../models/product.model')

router.route('/').get((req, res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error' + err))
})

router.route('/add').post((req, res) => {
    const name = req.body.name
    const desc = req.body.desc
    const price = req.body.price
    const image = req.body.image
    const cateid = req.body.cateid
    const isDeleted =  req.body.isDeleted
    
    console.log(req);
    const newProduct = new Product({
        name,
        desc,
        price,
        image,
        cateid,
        isDeleted
    })

    newProduct.save()
        .then(() => res.json('Product be added'))
        .catch(err => res.status(400).json('Error' + err))
})

router.route('/:id').get((req, res) => {
    Product.findById(req.params.id)
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' +err))
})

router.route('/:id').delete((req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(() => res.json('Product is deleted'))
        .catch(err => res.status(400).json('Error: ' +err))
})

router.route('/update/:id').post((req, res) => {
    Product.findById(req.params.id)
        .then(product => {
            product.name = req.body.name
            product.desc = req.body.desc
            product.price = req.body.price
            product.image = req.body.image
            product.cateid = req.body.cateid
            product.isDeleted = req.body.isDeleted

            product.save()
                .then(() => res.json('Updated successfully!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' +err))
})
module.exports = router 