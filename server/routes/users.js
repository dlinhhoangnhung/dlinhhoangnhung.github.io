const router = require('express').Router()
const User = require('../models/user.model')
const {
    checkRole,
    userRegister,
    userLogin,
    userAuth,
    serializeUser } = require("../utils/Auth")

// router.get('/api/all', async (req, res) => {
//     await res.status(200).send("Public Content.");
// })

//Register for all role
router.post('/sign-up', async (req, res) => {
    await userRegister(req.body, "user", res)
})

//Login for all role 1, get token
router.post('/sign-in', async (req, res) => {
    await userLogin(req.body, res)
})

/* ---------------------------------- ADMIN --------------------------------- */
//2 is admin redirect admin dashboard
router.get("/api/admin", userAuth, checkRole(["admin"]), async (req, res) => {
    return res.json("hello admin")
})

//3 request token to use admin grant
// router.route('/').get(userAuth, checkRole(["admin"]), (req, res) => {
//     User.find()
//         .then(users => res.json(users))
//         .catch(err => res.status(400).json('Error' + err))
// })
/* ---------------------------------- USER ---------------------------------- */
//get own user profile, any  role
router.get("/api/profile", userAuth, async (req, res) => {

    return res.json(serializeUser(req.user))
})

router.get("/api/grant", userAuth, async (req, res) => {

    return res.json(serializeUser(req.user))
})

module.exports = router