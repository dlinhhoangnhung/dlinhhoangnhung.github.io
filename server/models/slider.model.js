const mongoose = require('mongoose')
const Schema = mongoose.Schema

const slideSchema = new Schema({
    name: { type: String, required: true, unique: true },
},
    {
        timestamps: true
    })

const Slide = mongoose.model('Slide', slideSchema)

module.exports = Slide