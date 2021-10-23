const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sizeSchema = new Schema({
    name: { type: String, required: true, unique: true, trim: true, minlength: true},
    desc: { type: String, required: true},
    productid: [
        {type: Schema.Types.ObjectId, required: true, ref: 'Product'}]
},
{
    timestamps: true
})

const Size = mongoose.model('Size', sizeSchema)

module.exports = Size