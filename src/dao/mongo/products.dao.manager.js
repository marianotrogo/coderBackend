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


getProductsById= async (id)=>{
    const product = await ProductModel.find({_id:id})
    if(product.length ==0){
        return console.log('No existe ese producto');
    }else{
        return product
    }
}

updateProduct = async (id, title, description, price, code, stock)=>{
    const filter = {_id: id}
    const update = {title, description, price, code, stock}

    let product = await ProductModel.findOneAndUpdate(filter, update)
    product.save()
    return product
}

deleteProduct = async (id)=>{
    const productDelete = await ProductModel.deleteOne({_id:id})
    return productDelete
}




module.exports = ProductManager