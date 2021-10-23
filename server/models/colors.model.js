const mongoose = require('mongoose')
const Schema = mongoose.Schema

const colorSchema = new Schema({
    name: { type: String, required: true, unique: true, trim: true, minlength: true},
    desc: { type: String, required: true},
    images: [String],
    productid: [
        {type: Schema.Types.ObjectId, required: true, ref: 'Product'}]
},
{
    timestamps: true
})

const Color = mongoose.model('Color', colorSchema)

module.exports = Color