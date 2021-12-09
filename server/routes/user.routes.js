// const { authJwt } = require("../middlewares");
// const controller = require("../controllers/user.controller");
// const router = require('express').Router()


// router.use(function (req, res, next) {
//     res.header(
//         //   "Access-Control-Allow-Headers",
//         //   "x-access-token, Origin, Content-Type, Accept"
//         "Authorization"
//     );
//     next();
// });

// //   app.get("/api/test/all", controller.allAccess);

// router.get("/users/api/users", [authJwt.verifyToken], controller.userBoard);

// router.get(
//     "/users/api/admin",
//     [authJwt.verifyToken, authJwt.isAdmin],
//     controller.adminBoard
// );

// module.exports = router