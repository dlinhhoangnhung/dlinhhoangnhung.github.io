const router = require('express').Router()
let Product = require('../models/product.model')

router.route('/').get((req, res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error' + err))
})

router.route('/add').post((req, res) => {

    const id = req.body.id //
    const name = req.body.name
    const desc = req.body.desc
    const price = req.body.price
    const image = req.body.image
    const cateid = req.body.cateid
    const isDeleted =  req.body.isDeleted
    
    const newProduct = new Product({
        id,
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

module.exports = router