const mongoose = require('mongoose');
const { dbUser, dbPassword, dbHost } = require('../configs/db.configs');


const mongooConnect = async () => {
    try {
        await `mongoose.connect('mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/?retryWrites=true&w=majority&appName=Cluster0')`
        console.log('db is connected');
    }
    catch (error) {
        console.log(error);
    }


}

module.exports = mongooConnect