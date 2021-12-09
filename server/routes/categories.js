const router = require('express').Router();
const authControllers = require("../controllers/authController")
const categoryController = require("../controllers/categoryController")
const Category = require('../models/category.model')

router.route("/")
    .get(categoryController.getAllCategories)
    .post(
        authControllers.userAuth,
        authControllers.checkRole(["admin"]),
        categoryController.addCate
    )


router.route('/:id')
    .get(categoryController.getCate)
    .patch(
        authControllers.userAuth,
        authControllers.checkRole(["admin"]),
        categoryController.updateCate
    )
    .delete(
        authControllers.userAuth,
        authControllers.checkRole(["admin"]),
        categoryController.deleteCate
    )

module.exports = router