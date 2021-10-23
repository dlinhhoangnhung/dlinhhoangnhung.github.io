const router = require('express').Router()
const authControllers = require("../controllers/authController")
const productController = require("../controllers/productController")


router.route('/')
    .get(productController.getAllProducts)
    .post(
        authControllers.userAuth,
        authControllers.checkRole(["admin"]),
        productController.addProduct
    )

router.route('/:id')
    .get(productController.getProduct)
    .patch(
        authControllers.userAuth,
        authControllers.checkRole(['admin']),
        productController.uploadProductImages,
        productController.resizeProductImages,
        // productController.resizeImages,
        productController.updateProduct
    )
    .delete(
        authControllers.userAuth,
        authControllers.checkRole(['admin']),
        productController.deleteProduct
    )

module.exports = router