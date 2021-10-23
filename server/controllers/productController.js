const Product = require('../models/product.model')
const multer = require('multer')
const sharp = require('sharp')
const AppError = require('../utils/appError')
const multerStorage = multer.memoryStorage();
const catchAsync = require('../utils/catchAsync')


const multerFilter = (req, file, cb) => { // filter if !image
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb(new AppError("Please upload only images.", false));
    }
};

const upload = multer({
    storage: multerStorage,  //The array of files will be stored in req.files.
    fileFilter: multerFilter
})

exports.uploadProductImages = upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 3 }
])

exports.resizeImages = async (req, res, next) => {
    if (!req.files) return next();
    req.body.images = [];
    await Promise.all(
        req.files.images.map(async file => {
            const newFilename = `product-${req.params.id}-${Date.now()}.jpeg`
            await sharp(file.buffer)
                .resize(640, 320)
                .toFormat("jpeg")
                .jpeg({ quality: 90 })
                .toFile(`../public/assets/imgs/products/${newFilename}`)
            req.body.images.push(newFilename);
        })
    );
    next();
};
/* -------------------------------------------------------------------------- */
exports.resizeProductImages = catchAsync(async (req, res, next) => {
    console.log(req.files)

    //check if there are no images uploaded, move straight to the next middleware

    // 1  Main image
    if (!req.files.thumbnail || !req.files.images) return next()
    req.body.thumbnail = `product-${req.params.id}-${Date.now()}-cover.jpeg`
    await sharp(req.files.thumbnail[0].buffer)
        .resize(2000, 1300)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`../public/assets/imgs/products/${req.body.thumbnail}`)
    console.log(req.body.thumbnail)

    // 2 Images
    req.body.images = []
    await Promise.all(
        req.files.images.map(async (file, i) => {
            const filename = `product-${req.params.id}-${Date.now()}-${i + 1}.jpeg`

            await sharp(file.buffer)
                .resize(2000, 1300)
                .toFormat('jpeg')
                .jpeg({ quality: 90 })
                .toFile(`../public/assets/imgs/products/${filename}`)

            req.body.images.push(filename)
        })
    )


    next()




})

exports.getAllProducts = async (req, res) => { 

    Product.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Alo Error' + err))
}

exports.addProduct = (req, res) => {
    
    const name = req.body.name
    const desc = req.body.desc
    const price = req.body.price
    const images = req.body.images
    const cateid = req.body.cateid
    const isDeleted = req.body.isDeleted

    console.log(req);
    const newProduct = new Product({
        name,
        desc,
        images,
        price,
        cateid,
        isDeleted
    })

    newProduct.save()
        .then(() => res.json('Product be added'))
        .catch(err => res.status(400).json('Error' + err))
}

exports.getProduct = (req, res) => {
    Product.findById(req.params.id)
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err))
}

exports.updateProduct = (req, res) => {
    Product.findById(req.params.id)
        .then(product => {

            product.name = req.body.name
            product.desc = req.body.desc
            product.price = req.body.price
            product.images = req.body.images
            product.thumbnail = req.body.thumbnail
            product.cateid = req.body.cateid
            product.isDeleted = req.body.isDeleted

            if(req.params.name){
                res.json("Name existed")
            }
            product.save()
                .then(() => res.json(product))
                .catch(new AppError(err => res.status(400).json('Error: ' + err)))
        })
        .catch(err => res.status(400).json('Error: ' + err))
}

exports.deleteProduct = (req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(() => res.json('Product is deleted'))
        .catch(err => res.status(400).json('Error: ' + err))
}