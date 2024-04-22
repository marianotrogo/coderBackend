const ProductModel = require('../models/products.model')

class ProductManager  {
    constructor (){
        console.log('Working Mongoo DB');
    }
}

getProducts = async ()=>{
    const products = await ProductModel.find({status: true})
    return products
};

addProducts  = async (title,description,price,code,stock)=>{
    let newProduct = await ProductModel.create({
        title,
        description,
        price,
        code,
        stock
    })
    return newProduct
}


module.exports = ProductManager