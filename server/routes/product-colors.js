const router = require('express').Router()
const authControllers = require("../controllers/authController")
const colorController = require("../controllers/colorController")


router.route('/')
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
        authControllers.checkRole(['admin']),
        colorController.uploadColorImages,
        colorController.resizeColorImages,
        // colorController.resizeImages,
        colorController.updateColor
    )
    .delete(
        authControllers.userAuth,
        authControllers.checkRole(['admin']),
        colorController.deleteColor
    )

module.exports = router