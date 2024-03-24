import { Router, json } from "express";
import __dirname from "../utils.js";
import productManager from "../productManager.js";

const productsRouter = Router();
let manager = new productManager(__dirname+"./product.json");
productsRouter.use(json());

productsRouter.get("/", async (req, res) => {
  console.log(__dirname)
  try {
    const products = await manager.getProducts();
    const { limit } = req.query;

    if (limit) {
      products.length = limit;
      return res.send(products);
    } else {
      res.send(products);
    }
  } catch (e) {
    res.status(404).send(`${e}`);
  }
});

productsRouter.get("/:pid", async (req, res) => {
  let num = parseInt(req.params.pid);
  const products = await manager.getProductsById(num);
  res.send(products);
});

productsRouter.post("/add", async(req,res,midSocket)=>{
  const code = Number(req.body.code);
  const title = await req.body.title;
  const description = await req.body.description;
  const price = await Number(req.body.price);
  //const thumbnail = await req.query.status;
  const stock = await Number(req.body.stock);
  const category = await req.body.category;
  const test = console.log(code+title+description+price+stock+category);
  const result = await manager.addProducts(code,title,description,price,stock,category);
  const enviarProds = await manager.getProducts();
  req.enviarProds = enviarProds;
  midSocket();
  await res.send(test)
})


productsRouter.put("/:pid", async (req, res) => {
  let pid = parseInt(req.params.pid);
  const { title, description, price, thumbnail, code, stock,category } = req.body;
  const updated = await manager.updateProduct(
    pid,{
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category}
  );
  res.send(updated);
});

productsRouter.delete("/:pid", async (req, res) => {
  let pid = parseInt(req.params.pid);
  const deleteProduct = await manager.deleteProduct(pid);
  res.send(deleteProduct);
});
export default productsRouter;