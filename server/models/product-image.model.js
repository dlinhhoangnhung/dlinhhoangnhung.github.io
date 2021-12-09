const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productimageSchema = new Schema({
    image: { type: String, required: true, unique: true, trim: true, minlength: true},
    productid: [{type: String, required: true, ref: 'Product'}],
},
{
    timestamps: true
})

const ProductImage = mongoose.model('ProductImage', productimageSchema)

module.exports = ProductImage