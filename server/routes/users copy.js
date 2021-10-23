const router = require('express').Router()
const { Redirect } = require('react-router')
const User = require('../models/user.model')

// CHUYEN SANG SYNTAX MOI, XOA ASYNC/AWAIT NEU khong chay thi unnote "cu~"


const {userAuth, serializeUser} = require("../middlewares/authJwt")
const controllers = require("../controllers/Auth");



// router.get('/api/all', async (req, res) => {
//     await res.status(200).send("Public Content.");
// })

//Register for all role
// cu~
// router.post('/sign-up', async (req, res) => {
//     await userRegister(req.body, "user", res)
//     // await userRegister(req.body, res)
//     // await verifySignUp.checkDuplicateUsernameOrEmail,
//     // verifySignUp.checkRolesExisted

// })
router.post("/sign-up", controllers.userRegister);


// moi
// router.post(
//     "/sign-up",
//     [
//         verifySignUp.checkDuplicateUsernameOrEmail,
//         verifySignUp.checkRolesExisted
//     ],
//     controller.signup
// );

//Login for all role 1, get token
// cu~
// router.post('/sign-in', async (req, res) => {
//     await userLogin(req.body, res)
// })
router.post("/sign-in", controllers.userLogin);

/* ---------------------------------- ADMIN --------------------------------- */
//2 is admin redirect admin dashboard
// router.get("/api/admin", userAuth, checkRole(["admin"]), async (req, res) => {
//     await res.json('Hello Admin')
        
// })

//3 request token to use admin grant
// router.route('/').get(userAuth, checkRole(["admin"]), (req, res) => {
//     User.find()
//         .then(users => res.json(users))
//         .catch(err => res.status(400).json('Error' + err))
// })
/* ---------------------------------- USER ---------------------------------- */
//get own user profile, any  role
// cu~
// router.get("/api/profile", userAuth, async (req, res) => {

//     return res.json(serializeUser(req.user))
// })
router.get("/api/profile", userAuth, async (req, res) => {
         return res.json(serializeUser(req.user))
     });


// cu~

// router.get("/api/grant", userAuth, async (req, res) => {
//     return res.json(serializeUser(req.user))
// })
router.get("/api/grant", controllers.userAuth, (req, res) => {
    return res.json(controllers.serializeUser(req.user))
});
module.exports = router