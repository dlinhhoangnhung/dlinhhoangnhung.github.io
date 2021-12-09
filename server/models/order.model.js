const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    orderItems: [
        {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            textColor: { type: String },
            textSize: { type: String},
            thumbnail: { type: String, required: true },
            price: { type: Number, required: true },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            }
        }
    ],
    shippingInfo: {
        fullName: { type: String, required: true },
        address: { type: String, required: true },
        phone: { type: String, required: true },
    },
    paymentMethod: { type: String, default: "COD", required: true },
    itemsPrice: { type: Number, required: true },
    // shippingPrice: { type: Number, required: true},  =>  api shipping + weight of items
    totalPrice: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    process: {
        init: { type: Boolean, default: true },
        processing: { type: Boolean, required: false },
        ordering: { type: Boolean, required: false },
        shipped : { type: Boolean, required: false },
        delivered : { type: Boolean, required: false },
    },

    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    deliveredAt: { type: Date },

    isChecked: { type: Boolean, default: false } // khi isChecked = 1 (order dc user tao),
    // , bang thong bao ben admin dashboard - findOne (isChecked ===1 ) thi hien ra thong bao, admin bam vao => isChecked= false
},
    {
        timestamps: true
    }
)

const Order = mongoose.model('Order', orderSchema)

module.exports = Order