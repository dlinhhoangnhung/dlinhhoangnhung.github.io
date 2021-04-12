const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: { type: String, required: true, unique: true, trim: true, minlength: true},
    desc: { type: String, required: true},
    cateid: { type: Schema.Types.ObjectId, required: true},
    price: { type: String, required: true},
    image: { type: String, required: true},
    isDeleted: { type: Boolean, default: 'false'}
},
{
    timestamps: true
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product