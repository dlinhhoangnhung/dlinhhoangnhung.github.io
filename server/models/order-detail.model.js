const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderdetailSchema = new Schema({
    orderid: { type: Schema.Types.ObjectId, required: true},
    productid: { type: Schema.Types.ObjectId, required: true},
    price: { type: Number, required: true},
    quantity: { type: Number, required: true}
},
{
    timestamps: true
})

const OrderDetail = mongoose.model('OrderDetail', orderdetailSchema)

module.exports = OrderDetail