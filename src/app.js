import express from "express";
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import __dirname from "./util.js";

const app = express();

app.use(express.static(__dirname + "../public"));

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

app.listen(8080, () => console.log(`Server listening to port 8080`));