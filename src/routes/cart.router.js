import { Router, json } from "express";
import __dirname from "../util.js";
import CartManager from "../cartManager/cartManager.js";
import productManager from "../productManager.js";

const cartRouter = Router();
let cartManager = new CartManager(__dirname+"/cartManager/carts.json");
let productsManager = new productManager(__dirname+"/products.json");
cartRouter.use(json());

cartRouter.get("/", async (req, res) => {
  let cart = await cartManager.getCart();
  res.send(cart);
});


cartRouter.post("/", async (req, res) => {
  let cart = await cartManager.addCart();
  res.send(cart);
});

cartRouter.get("/:cid", async (req, res) => {
  let cid = parseInt(req.params.cid);
  let cart = await cartManager.checkCart(cid);
  res.send(cart);
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
  let cid = parseInt(req.params.cid);
  let pid = parseInt(req.params.pid);
  let product = await productsManager.getProductById(pid);
  let cart = await cartManager.addProductToCart(cid, product);
  res.send(cart);
});

export default cartRouter;