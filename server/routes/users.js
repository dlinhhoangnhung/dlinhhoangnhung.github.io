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

/* ---------------------------------- ADMIN --------------------------------- */
//2 is admin redirect admin dashboard
// router.get("/api/admin", userAuth, checkRole(["admin"]), async (req, res) => {
//     await res.json('Hello Admin')

// })

//3 request token to use admin grant
/* ---------------------------------- USER ---------------------------------- */
router.get('/user/:userId', authControllers.userAuth, userController.getUser);
router.get('/users', authControllers.userAuth, authControllers.checkRole(["admin"]), userController.getUsers);
router.put('/user/:userId', authControllers.userAuth, userController.updateUser)
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