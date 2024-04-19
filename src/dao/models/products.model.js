const mongoose = require('mongoose')
const productCollection = 'product'

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    code: string,
    stock: Number,
    status: boolean,
})

const Product = mongoose.model(productCollection, productSchema)

model.exports = Product