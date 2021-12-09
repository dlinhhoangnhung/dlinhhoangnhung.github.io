const Product = require('../models/product.model')
const multer = require('multer')
const sharp = require('sharp')
const AppError = require('../utils/appError')
const multerStorage = multer.memoryStorage();
const catchAsync = require('../utils/catchAsync')

const multerFilter = (req, file, cb) => { // filter if !image
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg"
    ) {
        cb(null, true);
    } else {
        cb(new AppError("Please upload only images.", false));
    }
};

const upload = multer({
    storage: multerStorage, //multer storage save file 
    fileFilter: multerFilter
})

exports.getColorByProduct = (req, res) => {
    Product.aggregate([
        {
            $lookup: //you can see at document
            {
                from: 'colors',
                localField: 'colorslist',
                foreignField: '_id',
                as: 'color'
            }
        },
        console.log(color => res.json(color)),
        {
            $unwind: "$color",
        },
    ])
        // Product.aggregate.lookup({
        //     from: 'products',
        //     localField: 'userId',
        //     foreignField: '_id',
        //     as: 'users'
        // })
        .then(color => res.json(color))
        .catch(err => res.status(400).json('Error: ' + err))
}

exports.uploadProductThumbnail = upload.single(
    { name: 'thumbnail', maxCount: 1 },
    // 'thumbnail', 1
)
exports.uploadProductImages = upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 6 }
])


exports.resizeImages = async (req, res, next) => {
    console.log('alo image')
    console.log(req.files)
    //check if there are no images uploaded, move straight to the next middleware

    // 1  Main image
    if (req.files.images) {
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
    } else {
        return next()
    }
};

exports.resizeBoth = catchAsync(async (req, res, next) => {
    console.log(req.files)

    console.log(req.files.images.length)

    //check if there are no images uploaded, move straight to the next middleware

    // 1  Main image
    // if (!req.files.thumbnail || !req.files.images) return next()
    try {
        if (req.files.images) {
            console.log('alo  : ')
            // req.body.thumbnail = `product-${req.params.id}-${Date.now()}-cover.jpeg`
            // await sharp(req.files.thumbnail[0].buffer)
            //     .resize(2000, 1300)
            //     .toFormat('jpeg')
            //     .jpeg({ quality: 90 })
            //     .toFile(`../public/assets/imgs/products/${req.body.thumbnail}`)
            // console.log(req.body.thumbnail)

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
                    console.log('ok? :' + req.body.images)

                })
            )
            next()
        } else {
            return next()
        }
    } catch (error) {
        console.log(error)
    }
})
/* -------------------------------------------------------------------------- */
exports.resizeProductThumbnail = catchAsync(async (req, res, next) => {
    console.log(req.files)
    console.log("alo")

    //check if there are no images uploaded, move straight to the next middleware
    // 1  Main image
    // if (!req.files.thumbnail || !req.files.images) return next()
    console.log(req.files.images)
    if (req.files.thumbnail) {
        req.body.thumbnail = `product-${req.params.id}-${Date.now()}-cover.jpeg`
        await sharp(req.files.thumbnail[0].buffer)
            .resize(2000, 1300)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(`../public/assets/imgs/products/${req.body.thumbnail}`)
        console.log('thumnai;l: ' + req.body.thumbnail)
        next()
    } else {
        return next()
    }
})

exports.resizeProductImages = catchAsync(async (req, res, next) => {
    console.log(req.files)
    //check if there are no images uploaded, move straight to the next middleware

    // 1  Main image
    if (req.files.images || req.files.thumbnail) {
        console.log('alo image')

        if (req.files.images) {
            req.body.images = []
            await Promise.all(
                req.files.images.map(async (file, i) => {
                    const filename = `product-${Date.now()}-${i + 1}.jpeg`
                    // const filename = `product-${req.body.name}-${Date.now()}-${i + 1}.jpeg`

                    await sharp(file.buffer)
                        .resize(2000, 1300)
                        .toFormat('jpeg')
                        .jpeg({ quality: 90 })
                        .toFile(`../public/assets/imgs/products/${filename}`)

                    req.body.images.push(filename)
                })
            )
        }
        // 2 Images
        if (req.files.thumbnail) {
            req.body.thumbnail = `product-${Date.now()}-cover.jpeg`
            await sharp(req.files.thumbnail[0].buffer)
                .resize(2000, 1300)
                .toFormat('jpeg')
                .jpeg({ quality: 90 })
                .toFile(`../public/assets/imgs/products/${req.body.thumbnail}`)
            console.log('thumnai;l: ' + req.body.thumbnail)
        }
        next()
    } else {
        return next()
    }



    // // 1  Main image
    // if (!req.files.thumbnail || !req.files.images) return next()
    // req.body.thumbnail = `product-${req.params.id}-${Date.now()}-cover.jpeg`
    // await sharp(req.files.thumbnail[0].buffer)
    //     .resize(2000, 1300)
    //     .toFormat('jpeg')
    //     .jpeg({ quality: 90 })
    //     .toFile(`../public/assets/imgs/products/${req.body.thumbnail}`)
    // console.log(req.body.thumbnail)

    // // 2 Images
    // req.body.images = []
    // await Promise.all(
    //     req.files.images.map(async (file, i) => {
    //         const filename = `product-${req.params.id}-${Date.now()}-${i + 1}.jpeg`

    //         await sharp(file.buffer)
    //             .resize(2000, 1300)
    //             .toFormat('jpeg')
    //             .jpeg({ quality: 90 })
    //             .toFile(`../public/assets/imgs/products/${filename}`)

    //         req.body.images.push(filename)
    //     })
})


exports.updateImages = (req, res) => {
    Product.findById(req.params.id)
        .then(product => {
            product.images = req.body.images
            // product.thumbnail = req.body.thumbnail

            product.save()
                .then(() => res.json(product))
                .catch(new AppError(err => res.status(400).json('Error: ' + err)))
        })
        .catch(err => res.status(400).json('Error: ' + err))
}

exports.uploadProductImage1 = upload.fields(
    { name: 'image1', maxCount: 1 },
)
exports.uploadProductImage2 = upload.fields(
    { name: 'image2', maxCount: 1 },
)
exports.uploadProductImage3 = upload.fields(
    { name: 'image3', maxCount: 1 },
)
exports.uploadProductImage4 = upload.fields(
    { name: 'image4', maxCount: 1 },
)
exports.uploadProductImage5 = upload.fields(
    { name: 'image5', maxCount: 1 },
)
exports.uploadProductImage6 = upload.fields(
    { name: 'image6', maxCount: 1 },
)


exports.resizeProductImage1 = catchAsync(async (req, res, next) => {
    console.log(req.body)
    if (!req.files.images1) return next()
    req.body.images1 = `product-${req.params.id}-${Date.now()}-cover.jpeg`
    await sharp(req.files.images1[0].buffer)
        .resize(2000, 1300)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`../public/assets/imgs/products/${req.body.images1}`)
    console.log(req.body.images1)
})

exports.resizeProductImage2 = catchAsync(async (req, res, next) => {
    if (!req.files.images2) return next()
    req.body.images2 = `product-${req.params.id}-${Date.now()}-cover.jpeg`
    await sharp(req.files.images2[0].buffer)
        .resize(2000, 1300)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`../public/assets/imgs/products/${req.body.images2}`)
    console.log(req.body.images2)
})
exports.resizeProductImage3 = catchAsync(async (req, res, next) => {
    console.log("alo")
    console.log(req.files.image3)
    if (req.files.image3) {
        req.body.image3 = `product-${req.body.name}-${Date.now()}-cover.jpeg`
        await sharp(req.files.image3[0].buffer)
            .resize(2000, 1300)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(`../public/assets/imgs/products/${req.body.image3}`)
        console.log('image3: ' + req.body.image3)
        next()
    } else {
        return next()
    }
})
exports.resizeProductImage4 = catchAsync(async (req, res, next) => {
    console.log("alo")
    console.log(req.files.image4)
    if (req.files.image4) {
        req.body.image4 = `product-${req.body.name}-${Date.now()}-cover.jpeg`
        await sharp(req.files.image4[0].buffer)
            .resize(2000, 1300)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(`../public/assets/imgs/products/${req.body.image4}`)
        console.log('image1: ' + req.body.image4)
        next()
    } else {
        return next()
    }
})
exports.resizeProductImage5 = catchAsync(async (req, res, next) => {
    console.log("alo")
    console.log(req.files.image5)
    if (req.files.image5) {
        req.body.image5 = `product-${req.body.name}-${Date.now()}-cover.jpeg`
        await sharp(req.files.image5[0].buffer)
            .resize(2000, 1300)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(`../public/assets/imgs/products/${req.body.image5}`)
        console.log('image5: ' + req.body.image5)
        next()
    } else {
        return next()
    }
})
exports.resizeProductImage6 = catchAsync(async (req, res, next) => {
    console.log("alo")
    console.log(req.files.image6)
    if (req.files.image6) {
        req.body.image6 = `product-${req.body.name}-${Date.now()}-cover.jpeg`
        await sharp(req.files.image1[0].buffer)
            .resize(2000, 1300)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(`../public/assets/imgs/products/${req.body.image6}`)
        console.log('image6: ' + req.body.image6)
        next()
    } else {
        return next()
    }
})


exports.updateProduct = async (req, res) => {
    console.log(req.body.thumbnail);

    await Product.findById(req.params.id)
        .then(product => {
            console.log(req.body);
            console.log(req.body.sizeslist);


            product.name = req.body.name
            product.desc = req.body.desc
            product.price = req.body.price
            product.sizeslist = req.body.sizeslist
            product.colorslist = req.body.colorslist
            product.images = req.body.images

            product.thumbnail = req.body.thumbnail
            product.cateid = req.body.cateid
            product.isDeleted = req.body.isDeleted

            if (req.params.name) {
                res.json("Name existed")
            }

            product.save()
                .then(() => res.json("Product be edited. " + product))
                .catch(new AppError(err => res.status(400).json('Error: ' + err)))

        })
        .catch(err => res.status(400).json('Error: ' + err))
}

exports.getAllProducts = (req, res) => {
    //  Product.aggregate([
    //     {
    //         $lookup: //you can see at document
    //         {
    //             from: "colors", // collection name in mongodb, not model
    //             localField: "_id", // field in current colection
    //             foreignField: "product", // field at lookup colection
    //             as: "color" //you can set whatever name you want 
    //         },
    //     },
    //     {
    //         $unwind: "$color",
    //     },
    // ])
    //     .then(products => (res.json(products),
    //         console.log(products)
    //     ))
    //     .catch(err => res.status(400).json('Error: ' + err))
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Alo Error' + err))
}

exports.addProduct = async (req, res) => {
    console.log('alo?')
    const name = req.body.name
    const desc = req.body.desc
    const price = req.body.price
    const colorslist = req.body.colorslist
    const sizeslist = req.body.sizeslist
    const images = req.body.images
    const thumbnail = req.body.thumbnail
    const cateid = req.body.cateid
    const isDeleted = req.body.isDeleted

    console.log(req);
    const newProduct = new Product({
        name,
        desc,
        images,
        thumbnail,
        price,
        cateid,
        colorslist,
        sizeslist,
        isDeleted
    })
    console.log("req.body: " + req.body.colorid)
    await newProduct.save()
        .then(() => res.json('Product be added'))
        .catch(err => res.json('Error' + err))
}


exports.getProduct = (req, res) => {
    Product.findById(req.params.id)
        .then((product) => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err))
}



exports.deleteProduct = (req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(() => res.json('Product is deleted'))
        .catch(err => res.status(400).json('Error: ' + err))
}