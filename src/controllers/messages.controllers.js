const {Router, json} = require('express')
const  MessageModel = require('../dao/models/messages.model')




const messageRouter = Router()

messageRouter.get('/chat', async (req, res)=>{
    try {
        const messages = await MessageModel.find()
        res.send(messages)
        
    } catch (error) {
        res.json({error})
    }
})

messageRouter.post('/chat', async (req,res)=>{
    try {
        const {user, message} = req.body

        const newMessage = {
            user,
            message
        }

        const saveMessage = await MessageModel.save(newMessage)
        res.json({saveMessage})
        socket.emit('messages', saveMessage)

    } catch (error) {
        
    }
       
})

module.exports = messageRouter