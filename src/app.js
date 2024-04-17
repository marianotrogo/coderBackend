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



app.use(express.static(process.cwd() + '/src/public'))
app.use(express.json())
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
        socket.on('actProds', data=>{
            productos.push(data)
            io.emit('prodsAct',  productos)
        })
        })
        
        
           })
    


// app.use("/api/carts", cartRouter);

