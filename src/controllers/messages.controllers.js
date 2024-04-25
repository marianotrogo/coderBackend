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
        const newMessage = new MessageModel({
            user : req.body.userName,
            message: req.body.message
        })

        const savedMessage = await newMessage.save()
        res.status(201).json(savedMessage)

        io.emit('newMessage', savedMessage)
        console.log(savedMessage);
        // const { user, message } =  req.body
        // const newMessage = {
        //     user,
        //     message
        // }


        // const addMessage = await MessageModel.save(newMessage)
        // const messages = await MessageModel.find()
        // global.io.emit('messageForChat', messages)
        
        // res.send(addMessage)
    } catch (error) {
        res.json({error})
    }
})

module.exports = messageRouter