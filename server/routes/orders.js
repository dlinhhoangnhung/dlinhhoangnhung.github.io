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
router.route('/user/:userId')
    .get(
        authControllers.userAuth,
        orderController.getOrdersbyUserId
    )

router.route('/new-orders/:id')
    .get( // admin
        authControllers.userAuth,
        authControllers.checkRole(["admin"]),
        orderController.getNewOrder)

router.route('/new-order-checked/:id')
    .get( // admin
        authControllers.userAuth,
        authControllers.checkRole(["admin"]),
        orderController.checkedOrder)
module.exports = router
