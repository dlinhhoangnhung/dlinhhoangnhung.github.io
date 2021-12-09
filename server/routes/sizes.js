const router = require('express').Router();
const authControllers = require("../controllers/authController")
const sizeController = require("../controllers/sizeController")
const Size = require('../models/sizes.model')

router.route("/")
    .get(sizeController.getAllSizes)
    .post(
        authControllers.userAuth,
        authControllers.checkRole(["admin"]),
        sizeController.addColor
    )

router.route("/products")
    .get(sizeController.getSizeContainProduct)

router.route('/:id')
    .get(sizeController.getColor)
    .patch(
        authControllers.userAuth,
        authControllers.checkRole(["admin"]),
        sizeController.updateColor
    )


router.route('/:id').delete((req, res) => {
    Size.findByIdAndDelete(req.params.id)
        .then(() => res.json('Color is deleted'))
        .catch(err => res.status(400).json('Error: ' + err))
})


module.exports = router