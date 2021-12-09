const router = require('express').Router()
const authControllers = require("../controllers/authController")
const productController = require("../controllers/productController")

router.route('/')
    .get(productController.getAllProducts)
    .post(
        // authControllers.userAuth,
        // authControllers.checkRole(['admin']),
        productController.uploadProductImages,
        productController.resizeProductImages,
        // productController.resizeImages,
        productController.addProduct
    )

router.route('/colors')
    .get(productController.getColorByProduct)

router.route('/:id')
    .get(productController.getProduct)
    .patch( //new solu
        authControllers.userAuth,
        authControllers.checkRole(['admin']),
        productController.uploadProductImages,
        productController.resizeProductImages,
        // productController.resizeImages,
        productController.updateProduct
    )
    // .patch( old
    //     authControllers.userAuth,
    //     authControllers.checkRole(['admin']),
    //     productController.uploadProductImages,
    //     productController.resizeProductImages,
    //     // productController.resizeImages,
    //     productController.updateProduct
    // )
 
    // .post( 
    //     // authControllers.userAuth,
    //     // authControllers.checkRole(['admin']),
    //     productController.uploadProductThumbnail,
    //     productController.resizeProductThumbnail,
    //     productController.updateThumbnail
    // )
    .delete(
        authControllers.userAuth,
        authControllers.checkRole(['admin']),
        productController.deleteProduct
    )

module.exports = router