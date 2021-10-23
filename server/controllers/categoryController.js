const Category = require('../models/category.model')
const AppError = require('../utils/appError')

exports.getAllCategories = async (req, res) => {
    Category.find()
        .then(categories => res.json(categories))
        .catch(err => res.status(400).json('You are not loggin or dont have been allowed to access' + err))
}


exports.addCate = (req, res) => {
    const name = req.body.name
    const desc = req.body.desc
    const user = req.user._id
    console.log(user)
    const newCategory = new Category({
        name,
        desc
    })

    newCategory.save()
        .then(() => res.json('Category be added'))
        .catch(err => res.status(400).json('Error' + err))
}

exports.getCate = (req, res) => {
    Category.findById(req.params.id)
        .then(category => res.json(category))
        .catch(err => res.status(400).json('Error: ' + err))
}

exports.updateCate = (req, res) => {
    Category.findById(req.params.id)
        .then(category => {
            category.name = req.body.name
            category.desc = req.body.desc

            category.save()
                .then(() => res.json('Updated successfully!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
}