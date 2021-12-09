const router = require('express').Router();
const authControllers = require("../controllers/authController")
const colorController = require("../controllers/colorController")
const Color = require('../models/color.model')

router.route("/")
    .get(colorController.getAllColors)
    .post(
        authControllers.userAuth,
        authControllers.checkRole(["admin"]),
        colorController.addColor
    )


router.route('/:id')
    .get(colorController.getColor)
    .patch(
        authControllers.userAuth,
        authControllers.checkRole(["admin"]),
        colorController.updateColor
    )


router.route('/:id').delete((req, res) => {
    Color.findByIdAndDelete(req.params.id)
        .then(() => res.json('Color is deleted'))
        .catch(err => res.status(400).json('Error: ' + err))
})


module.exports = router