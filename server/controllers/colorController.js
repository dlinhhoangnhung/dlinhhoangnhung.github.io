const Color = require('../models/colors.model')
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

exports.uploadColorImages = upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 3 }
])

exports.resizeImages = async (req, res, next) => {
    if (!req.files) return next();
    req.body.images = [];
    await Promise.all(
        req.files.images.map(async file => {
            const newFilename = `Color-${req.params.id}-${Date.now()}.jpeg`
            await sharp(file.buffer)
                .resize(640, 320)
                .toFormat("jpeg")
                .jpeg({ quality: 90 })
                .toFile(`../public/assets/imgs/Colors/${newFilename}`)
            req.body.images.push(newFilename);
        })
    );
    next();
};
/* -------------------------------------------------------------------------- */
exports.resizeColorImages = catchAsync(async (req, res, next) => {
    console.log(req.files)

    //check if there are no images uploaded, move straight to the next middleware

 
    if (!req.files.images) return next()
    // 2 Images
    req.body.images = []
    await Promise.all(
        req.files.images.map(async (file, i) => {
            const filename = `Color-${req.params.id}-${Date.now()}-${i + 1}.jpeg`

            await sharp(file.buffer)
                .resize(2000, 1300)
                .toFormat('jpeg')
                .jpeg({ quality: 90 })
                .toFile(`../public/assets/imgs/colors/${filename}`)

            req.body.images.push(filename)
        })
    )
    next()
})

exports.getAllColors = async (req, res) => {
    Color.find()
        .then(colors => res.json(colors))
        .catch(err => res.status(400).json('Alo Error' + err))
}

exports.addColor = (req, res) => {
    const name = req.body.name
    const desc = req.body.desc
    const images = req.body.images
    const productid = req.body.productid

    console.log(req);
    const newColor = new Color({
        name,
        desc,
        images
    })

    newColor.save()
        .then(() => res.json('Color be added'))
        .catch(err => res.status(400).json('Error' + err))
}

exports.getColor = (req, res) => {
    Color.findById(req.params.id)
        .then(color => res.json(color))
        .catch(err => res.status(400).json('Error: ' + err))
}

exports.updateColor = (req, res) => {
    Color.findById(req.params.id)
        .then(color => {

            color.name = req.body.name
            color.desc = req.body.desc
            color.images = req.body.images
            color.productid = req.body.productid

            if(req.params.name){
                res.json("Name existed")
            }
            color.save()
                .then(() => res.json(color))
                .catch(new AppError(err => res.status(400).json('Error: ' + err)))
        })
        .catch(err => res.status(400).json('Error: ' + err))
}

exports.deleteColor = (req, res) => {
    Color.findByIdAndDelete(req.params.id)
        .then(() => res.json('Color is deleted'))
        .catch(err => res.status(400).json('Error: ' + err))
}