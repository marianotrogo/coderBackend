const mongoose = require('mongoose');
const { dbUser, dbPassword, dbHost, dbName } = require('../configs/db.configs');
const ProductModel = require('../dao/models/products.model');


const mongooConnect = async () => {
    try {
        await  mongoose.connect(`mongodb+srv://marianoemmanuel22:Mt086313.@cluster0.9jkirbe.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0`)
        console.log('db is connected');
    //    const mongoProd = await ProductModel.aggregate([
    //         {
    //             $match: {description: 'Ps4'}
    //         },
            
    //     ])
    //     console.log(mongoProd);
    }
    catch (error) {
        console.log(error);
    }

}

module.exports = mongooConnect