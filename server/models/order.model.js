const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    cusid: { type: String, required: true},
    amount: { type: Number, required: true},
    ship_address: { type: String, required: true},
    status: { type: Number, default: 'true'},
    isDeleted: { type: Boolean, default: 'false'}
},
{
    timestamps: true
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order