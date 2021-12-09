const router = require('express').Router()
const { Mongoose } = require('mongoose')
let Images = require('../models/product-image.model')

const authControllers = require("../controllers/authController")
const userController = require("../controllers/userController")

router.get('/', authControllers.userAuth, authControllers.checkRole(["admin"]), async (req, res) => {
    Images.find()
        .then(image => res.json(image))
        .catch(err => res.status(400).json('Alo Error' + err))
})


router.route('/add').post(authControllers.userAuth, authControllers.checkRole(["admin"]), (req, res) => {
    const image = req.body.image
    const productid = req.body.productid

    console.log(req);
    const newImages = new Images({
        image,
        productid
    })

    newImages.save()
        .then(() => res.json('Images be added'))
        .catch(err => res.status(400).json('Error' + err))
})

router.route('/:id').get((req, res) => {
    Images.findById(req.params.id)
        .then(images => res.json(images))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').delete((req, res) => {
    Images.findByIdAndDelete(req.params.id)
        .then(() => res.json('Image is deleted'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/update/:id').post((req, res) => {
    Images.findById(req.params.id)
        .then(image => {
            image.image = req.body.image
            image.productid = req.body.productid
        
            image.save()
                .then(() => res.json('Updated successfully!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})
module.exports = router