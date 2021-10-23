const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: { type: String, required: true, unique: true, trim: true, minlength: true},
    desc: { type: String, required: true},
    cateid: [
        {type: Schema.Types.ObjectId, required: true, ref: 'Category'}],
    price: { type: Number, required: true},
    thumbnail: { type: String},
    images: [String],
    sizes: [String],
    colors: [String],
    isDeleted: { type: Boolean, default: 'false'},
},
{
    timestamps: true
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product