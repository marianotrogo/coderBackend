const express = require('express');
const productsRouter = require('./routes/products.router')
const cartRouter = require('./routes/cart.router')
const handlebars = require('express-handlebars');
const { engine } = require('express-handlebars')
const { Server } = require('socket.io')
const router = require('./routes/router');
const mongooConnect = require('./db');
const bodyParser = require('body-parser');
const MessageModel = require('./dao/models/messages.model');



const chats = [];

mongooConnect()

const app = express();
app.use(bodyParser.json())
app.use(express.static(process.cwd() + '/src/public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/api/products', productsRouter)
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', process.cwd() + '/src/views')

router(app)

const httpServer = app.listen(8080, () => {
    console.log('Server listen to port 8080')
});

const io = new Server(httpServer)



io.on('connection', socket => {
    socket.on('newClient', data => {
        console.log(data);
    })
    socket.on('productAdded', (data) => {
        io.emit('regenList')
    })
    socket.on('newUser', data => {
        socket.broadcast.emit('userConnected', data)
        socket.emit('messagesBox', chats)
    })
    socket.on('message', async  data => {
        chats.push(data)
       
        try {
            const newMessage = new MessageModel({
              user: data.user,
              message: data.message
            });
            await newMessage.save();
          } catch (error) {
            console.error("Error al guardar el input:", error);
          }
        

            io.emit('messagesBox', chats)
      
    })
})
















    
    
        
        
        

