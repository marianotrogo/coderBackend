import express, {urlencoded} from "express";
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import __dirname from "./utils.js";
import { engine } from "express-handlebars";
import viewsRouter from "./routes/views.router.js"
import { Server, Socket } from "socket.io";



const app = express();
app.use(urlencoded({extended: true}));

app.use(express.static(__dirname + "/../public"));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views',__dirname + '/views');

app.use(express.json());
app.use(express.static(__dirname + "../public"));
app.use('/', viewsRouter);

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

app.use((req,res, midSocket)=>{
    const data = req.enviarProds;
    req.socketServer= socketServer;
    socketServer.emit("productList", data)
    midSocket();
})



const httpServer = app.listen(8080, () => 
console.log(`Server listening to port 8080`));

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket)=>{
    console.log("nuevo cliente conectado");
    socket.emit("productList", "mensaje desde el server");
});
