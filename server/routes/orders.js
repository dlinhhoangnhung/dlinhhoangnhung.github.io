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
        orderController.createOrder,

    )

router.route('/user/delete-order-:orderId')
    .delete(
        authControllers.userAuth,
        orderController.deleteOrder
    )

router.route('/admin/delete-order-:orderId')
    .delete(
        authControllers.userAuth,
        authControllers.checkRole(["admin"]),
        orderController.deleteOrder
    )

router.route('/:id')
    .get(
        authControllers.userAuth,
        orderController.getOrder
    )

// get all orders of a user
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

router.route('/updated-order-processing-:id')
    .patch( // admin
        authControllers.userAuth,
        authControllers.checkRole(["admin"]),
        orderController.updateOrderProcess)


module.exports = router
