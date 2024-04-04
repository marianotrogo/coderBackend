const mongoose = require('mongoose');


const mongooConnect = async () => {
    try {
        await mongoose.connect('mongodb+srv://marianoemmanuel22:Mt086313.@cluster0.9jkirbe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        console.log('db is connected');
    }
    catch (error) {
        console.log(error);
    }


}

module.exports = mongooConnect