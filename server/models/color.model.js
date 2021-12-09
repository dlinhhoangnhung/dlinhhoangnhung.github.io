const mongoose = require('mongoose')
const Schema = mongoose.Schema

const colorSchema = new Schema({
    name: { type: String, required: true },
    colorcode: { type: String, require: true },
    product: [{
        type: Schema.Types.ObjectId, ref: 'Order'
    }],
    radiocode: { type: String }

},
    {
        timestamps: true
    })

const Color = mongoose.model('Color', colorSchema)

module.exports = Color