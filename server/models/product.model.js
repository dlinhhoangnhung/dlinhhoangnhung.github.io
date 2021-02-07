const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    id: { type: String, required: true},
    // name: { type: String, required: true},
    // desc: { type: String, required: true},
    // cateid: { type: String, required: true},
    // price: { type: String, required: true},
    // image: { type: String, required: true},
    // isDeleted: { type: Boolean, default: 'false'}
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product