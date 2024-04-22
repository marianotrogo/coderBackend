const mongoose = require('mongoose')

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

const ProductModel = mongoose.model(productCollection, productSchema)

module.exports = ProductModel