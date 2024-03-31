import express, { urlencoded } from "express";
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import __dirname from "./util.js";
import { engine } from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import { Server, Socket } from "socket.io";
import router from 'express';




const app = express();


app.use(urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.engine('handlebars', engine());

app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use('/', viewsRouter);

// app.use("/api/products", productRouter);
// app.use("/api/carts", cartRouter);

// app.use((req,res, midSocket)=>{
//     const data = req.enviarProds;
//     req.io= io;
//     io.emit("productList", data)
//     midSocket();
// })

router(app)


const httpServer = app.listen(8080, () => {
    console.log('Server listening to port 8080');
})

const io = new Server(httpServer);

io.on("connection", socket => {
    socket.emit("message", 'hola')
    socket.on('message', data => {
        console.log(data)
    })
});