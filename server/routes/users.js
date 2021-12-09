const router = require('express').Router()
const { Redirect } = require('react-router')
const User = require('../models/user.model')
const express = require('express')
// CHUYEN SANG SYNTAX MOI, XOA ASYNC/AWAIT NEU khong chay thi unnote "cu~"

const authControllers = require("../controllers/authController")
const userController = require("../controllers/userController")



//Register for all role
router.post('/sign-up', async (req, res) => {
    await authControllers.register(req.body, "user", res)
    // await userRegister(req.body, res)
    // await verifySignUp.checkDuplicateUsernameOrEmail,
    // verifySignUp.checkRolesExisted

})


//Login for all role 1, get token
// router.post('/sign-in', async (req, res) => { 
//     await controllers.userLogin(req.body, res)
// })
router.post('/sign-in', authControllers.login);

router.post('/', authControllers.userAuth, userController.updateUser);

router.post('/forgot-password', userController.forgotPassword)
router.post('/reset-password', userController.resetPassword)

router.post('/change-password/:userId', authControllers.userAuth, authControllers.changePassword)
/* ---------------------------------- ADMIN --------------------------------- */
//2 is admin redirect admin dashboard
// router.get("/api/admin", userAuth, checkRole(["admin"]), async (req, res) => {
//     await res.json('Hello Admin')

// })

//3 request token to use admin grant
/* ---------------------------------- USER ---------------------------------- */
router.get('/users', authControllers.userAuth, authControllers.checkRole(["admin"]), userController.getUsers);
router.get('/users/orders', authControllers.userAuth, userController.getUserContainOrder);

// Get One
router.get('/user/:userId', authControllers.userAuth, userController.getUser)
router.get('/user/admin/:userId', authControllers.userAuth, authControllers.checkRole(["admin"]), userController.getUser)

// user order
router.put('/user/create-order/:userId', authControllers.userAuth, userController.updateUserOrder)

//update info ok
router.patch('/user/update-info/:userId', authControllers.userAuth, userController.uploadAvatar, userController.resizeAvatar, userController.updateUser)

// changeEmail ok
router.route('/user/change-email/:userId')
    .post(
        authControllers.userAuth,
        userController.changeEmail,
    )

router.delete('/user/:userId', authControllers.userAuth, authControllers.checkRole(["admin"]), userController.deleteUser);
router.get('/user/orders/:userId', authControllers.userAuth, userController.findOrdersbyUser)

//get own user profile, any  role
router.get("/api/profile", authControllers.userAuth, async (req, res) => {
    return res.json(authControllers.serializeUser(req.user))
});

router.get("/api/grant", authControllers.userAuth, async (req, res) => {
    return res.json(authControllers.serializeUser(req.user))
});

module.exports = router