<<<<<<< HEAD
const express = require('express');
const handlebars = require('express-handlebars');
const router = require('./router');
const { Server, Socket } = require('socket.io');
const mongooConnect = require('./db');

const chats = [];

mongooConnect()

const app = express ();
=======
const express = require('express')
const productsRouter = require('./routes/products.router')
const cartRouter = require('./routes/cart.router')
const { engine } = require('express-handlebars')
// const viewsRouter = require('./routes/views.router')
const { Server } = require('socket.io')
const router = require('./routes/router')
const ProductManager = require('./productManager')


const app = express();
const manager = new ProductManager

>>>>>>> webSocket


app.use(express.static(process.cwd() + '/src/public'))
app.use(express.json())
<<<<<<< HEAD

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
=======
app.use(express.urlencoded({ extended: true }))
app.use('/api/products', productsRouter)
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', process.cwd() + '/src/views')




router(app)



const httpServer = app.listen(8080, () => {
    console.log('listen to port 8080')
})



const io = new Server(httpServer);

io.on('connection', (socket) => {
    socket.on('newClient', data=>{
        console.log(data);  
    })
    socket.on('productAdded',(data)=>{
        io.emit('regenList')
        })
        
        
        
    })
    




>>>>>>> webSocket
