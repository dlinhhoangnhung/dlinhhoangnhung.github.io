const Size = require('../models/sizes.model')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')

exports.getAllSizes = async (req, res) => {
    Size.find()
        .then(sizes => res.json(sizes))
        .catch(err => res.status(400).json('Alo Error' + err))
}

exports.getSizeContainProduct = (req, res) => {
    Size.aggregate([
        {
            $lookup: //you can see at document
            {
                from: "products", // collection name in mongodb, not model
                localField: "_id", // field in current colection
                foreignField: "sizeslist", // field at lookup colection
                as: "product" //you can set whatever name you want 
            },
        },
        {
            $unwind: "$product",
        },
    ])
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err))
}
exports.addSize = (req, res) => {
    const name = req.body.name
    const sizecode = req.body.sizecode

    console.log(req);
    const newSize = new Size({
        name,
        sizecode
    })

    newSize.save()
        .then(() => res.json('Size be added'))
        .catch(err => res.status(400).json('Error' + err))
}

exports.getSize = (req, res) => {
    Size.findById(req.params.id)
        .then(sizes => res.json(sizes))
        .catch(err => res.status(400).json('Error: ' + err))
}

exports.updatesize = (req, res) => {
    Size.findById(req.params.id)
        .then(size => {

            size.name = req.body.name
            size.sizecode = req.body.sizecode
            
            if(req.params.name){
                res.json("Name existed")
            }
            size.save()
                .then(() => res.json(size))
                .catch(new AppError(err => res.status(400).json('Error: ' + err)))
        })
        .catch(err => res.status(400).json('Error: ' + err))
}

exports.deletesize = (req, res) => {
    Size.findByIdAndDelete(req.params.id)
        .then(() => res.json('size is deleted'))
        .catch(err => res.status(400).json('Error: ' + err))
}