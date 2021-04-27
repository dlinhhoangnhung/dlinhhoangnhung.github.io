const router = require('express').Router();
let Category = require('../models/category.model')
const {
    checkRole,
    userRegister,
    userLogin,
    userAuth,
    serializeUser } = require("../utils/Auth")
// router.route('/').get((req, res) => {
//     Category.find()
//         .then(categories => res.json(categories))
//         .catch(err => res.status(400).json('Error' + err))
// })

router.get("/", userAuth, checkRole(["admin"]), async (req, res) => {
    Category.find()
        .then(categories => res.json(categories))
        .catch(err => res.status(400).json('You are not loggin or dont have been allowed to access' + err))
})


// router.route('/').get((req, res) => {
//     Category.find()
//         .then(categories => res.json(categories))
//         .catch(err => res.status(400).json('Error: ' + err))
// })

router.route('/add').post((req, res) => {
    const name = req.body.name
    const desc = req.body.desc

    const newCategory = new Category({
        name,
        desc
    })

    newCategory.save()
        .then(() => res.json('Category be added'))
        .catch(err => res.status(400).json('Error' + err))
})

router.route('/:id').get((req, res) => {
    Category.findById(req.params.id)
        .then(category => res.json(category))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').delete((req, res) => {
    Category.findByIdAndDelete(req.params.id)
        .then(() => res.json('Category is deleted'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/update/:id').post((req, res) => {
    Category.findById(req.params.id)
        .then(category => {
            category.name = req.body.name
            category.desc = req.body.desc

            category.save()
                .then(() => res.json('Updated successfully!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router