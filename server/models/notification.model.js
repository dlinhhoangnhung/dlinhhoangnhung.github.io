const mongoose = require('mongoose')
const Schema = mongoose.Schema

const notificationSchema = new Schema({
    content: { type: String , required: true},
    time: { type: String , required: true},
    type:  { type: Number , required: true}, // 1-Trang thai don hang 
    orderid: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isRead: { type: Boolean, default: false },
},
    {
        timestamps: true
    }
)

const Notification = mongoose.model('Notification', notificationSchema)

module.exports = Notification