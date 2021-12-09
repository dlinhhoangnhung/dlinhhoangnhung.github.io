const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sizeSchema = new Schema({
    name: { type: String, required: true },    
    sizecode: { type: String, required: true },  
    productslist: [
        { type: String }],
        
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'}
},
{
    timestamps: true
})

const Size = mongoose.model('Size', sizeSchema)

module.exports = Size