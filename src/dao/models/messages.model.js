const mongoose = require('mongoose')

const messagesCollection = 'messages'

const messageSchema = new mongoose.Schema({
    user: String,
    message: String
})

const MessageModel = mongoose.model(messagesCollection, messageSchema)

module.exports = MessageModel