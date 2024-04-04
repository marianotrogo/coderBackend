const mongoose = require('mongoose')

const userCollection = 'user'

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    status: {
        type: Boolean,
        default: true
    }

})

const User = mongoose.model(userCollection, userSchema)

module.exports = User