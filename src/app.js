const express = require('express');
const handlebars = require('express-handlebars');
const router = require('./router');
const { Server, Socket } = require('socket.io');
const mongooConnect = require('./db');

const chats = [];

mongooConnect()

const app = express ();


app.use(express.static(process.cwd() + '/src/public'))
app.use(express.json())

app.engine('handlebars', handlebars.engine());
app.set('views', (process.cwd() + '/src/views'));

router(app)

const httpServer = app.listen(3000, ()=>{
    console.log('Server listen to port 3000')
});

const io = new Server(httpServer)

io.on('connection', socket =>{
    socket.on('newUser', data =>{
        socket.broadcast.emit('userConnected', data)
        socket.emit('messageLogs', chats)
    })
    socket.on('message', data =>{
        chats.push(data)

        io.emit('messageLogs', chats)
    })
})