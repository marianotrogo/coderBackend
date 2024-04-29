const { Router, json } = require('express')
const MessageModel = require('../dao/models/messages.model')




const messageRouter = Router()

messageRouter.get('/chat', async (req, res) => {
    try {
        const messages = await MessageModel.find()
        res.send(messages)

    } catch (error) {
        res.json({ error })
    }
})

messageRouter.post('/chat',async  (req, res) => {
    try {
        const nuevoInput = new MessageModel({
            user: req.body.user,
            message: req.body.message
          });
          await nuevoInput.save();
          res.status(201).json({ mensaje: 'Input guardado correctamente' });




    } catch (error) {
        
    }
})

module.exports = messageRouter