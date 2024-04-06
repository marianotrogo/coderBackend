const express = require('express')
const productsRouter = require('./routes/products.router')
const cartRouter = require('./routes/cart.router')
const {engine} = require('express-handlebars')
const viewsRouter = require('./routes/views.router')
const {Server, Socket} = require('socket.io')


const app = express ();

app.use(express.static(process.cwd()+'public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/', viewsRouter)
app.use('/api/products', productsRouter)
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views',process.cwd()+'/src/views')


app.use((req,res, midSocket)=>{
    const data = req.enviarProds;
    req.io= io;
    io.emit("productList", data)
    midSocket();
})

const httpServer = app.listen(8080, ()=>{
    console.log('listen to port 8080')
})


const io = new Server(httpServer);

io.on('connection', (socket)=>{
    console.log(socket.id);
    socket.on("message", 'nuevo cliente conectado');
    socket.emit('productList', 'mensaje desde el server')
})
;


// app.use("/api/products", productsRouter);
// app.use("/api/carts", cartRouter);






