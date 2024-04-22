const MessageModel = require('../models/messages.model')

class ManagerMessage {
    constructor(){
        console.log('working message db');
    }
}

getMessages = async () =>{
    const messages = await MessageModel.find().lean()
    return messages
}

create = async (messages) =>{
    const result = await MessageModel.create(messages)
    return result
}

module.exports = ManagerMessage