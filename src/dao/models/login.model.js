const mongoose = require('mongoose')

const loginCollection = 'login'

const loginSchema = new mongoose.Schema({
    first_name:  String,
    last_name: String,
    email: {
        type: String,
        unique: true
    },
    password: String
})

const Login = mongoose.model(loginCollection, loginSchema)

module.exports = Login