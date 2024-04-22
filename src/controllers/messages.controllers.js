const {Router, json} = require('express')
const ManagerMessage = require('../dao/mongo/messages.dao.manager')
const MessageModel = require('../dao/models/messages.model')

const messageManager = new ManagerMessage()
messageRouter = Router()

messageRouter.use(json())

messageRouter.get('/', async(req, res)=>{
   try {
        const messages = await MessageModel.find().lean()
        res.json({payload: messages})
   } catch (error) {
        res.json({error})
   }
})

messageRouter.post('/', async (req,res)=>{
    try {
        const { user, message} = req.body

        const addMessage = {
            user,
            message
        }

        const newMessage = await MessageModel.create(addMessage)
        res.json({payload: newMessage})
    } catch (error) {
        res.json({error})
    }
})

module.exports = messageRouter


