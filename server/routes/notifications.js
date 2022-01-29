const router = require('express').Router()
const authControllers = require("../controllers/authController")
const notificationController = require("../controllers/notifyController")

router.route('/')
    .get( // admin
        authControllers.userAuth,
        authControllers.checkRole(["admin"]),
        notificationController.getAllNoti)

router.route('/user-noti')
    .get( // admin
        authControllers.userAuth,
        notificationController.getContainOrder)

router.route('/user-noti-unread')
    .get( // admin
        authControllers.userAuth,
        notificationController.getForUserUnread)



router.route('/noti-:id')
    .post(
        // authControllers.userAuth,
        notificationController.notiIsRead,
    )

module.exports = router
