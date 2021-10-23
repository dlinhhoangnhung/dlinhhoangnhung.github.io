const { SwapHorizRounded } = require('@material-ui/icons')
const Size = require('../models/sizes.model')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')

exports.getAllSizes = async (req, res) => {
    Size.find()
        .then(sizes => res.json(sizes))
        .catch(err => res.status(400).json('Alo Error' + err))
}

exports.addSize = (req, res) => {
    const name = req.body.name
    const desc = req.body.desc  
    const productid = req.body.productid


    console.log(req);
    const newSize = new Size({
        name,
        desc,
        productid
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
            size.desc = req.body.desc
            size.productid = req.body.productid

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