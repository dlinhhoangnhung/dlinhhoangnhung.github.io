const router = require('express').Router()
const authControllers = require("../controllers/authController")
const orderController = require("../controllers/orderController")

router.route('/')
    .get( // admin
        authControllers.userAuth,
        authControllers.checkRole(["admin"]),
        orderController.getAllOrders)
    .post(
        authControllers.userAuth,
        orderController.createOrder
    )

    router.route('/:id')
    .get(
        authControllers.userAuth,
        orderController.getOrder
    )
module.exports = router
