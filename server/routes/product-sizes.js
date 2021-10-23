const router = require('express').Router()
const authControllers = require("../controllers/authController")
const sizeController = require("../controllers/sizeController")


router.route('/')
    .get(sizeController.getAllSizes)
    .post(
        authControllers.userAuth,
        authControllers.checkRole(["admin"]),
        sizeController.addSize
    )

router.route('/:id')
    .get(sizeController.getSize)
    .patch(
        authControllers.userAuth,
        authControllers.checkRole(['admin'])
    )
    .delete(
        authControllers.userAuth,
        authControllers.checkRole(['admin']),
        sizeController.deletesize
    )

module.exports = router