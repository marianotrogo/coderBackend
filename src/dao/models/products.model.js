const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')


const productCollection = 'product'

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    code: String,
    stock: Number,
    status: {
        type: Boolean,
        default: true
    },
})

productSchema.plugin(mongoosePaginate)

const ProductModel = mongoose.model(productCollection, productSchema)

module.exports = ProductModel