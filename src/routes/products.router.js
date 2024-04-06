const { Router, json } = require('express')
const ProductManager = require('../productManager')

const productsRouter = Router();


let manager = new ProductManager(process.cwd() + "src/product.json");


productsRouter.use(json());

productsRouter.get("/", async (req, res) => {
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
  const products = await manager.findOne(num);
  res.send(products);
});

productsRouter.post("/add", async (req, res, midSocket) => {
  const title = await req.body.title;
  const description = await req.body.description;
  const price = Number(req.body.price);
  const code = Number(req.body.code);
  const stock = Number(req.body.stock);
  const test = console.log(title + description + price + code + stock);
  const result = await manager.addProducts(title, description, price, code, stock);
  const enviarProds = await manager.getProducts(result);
  req.enviarProds = enviarProds;
  midSocket();
  res.send(result)
})


productsRouter.put("/:pid", async (req, res) => {
  let pid = parseInt(req.params.pid);
  const { title, description, price, code, stock } = req.body;
  const updated = await manager.updateOne(
    pid, {
    title,
    description,
    price,
    code,
    stock
  }
  );
  res.send(updated, 'Updated');
});

productsRouter.delete("/:pid", async (req, res) => {
  let pid = parseInt(req.params.pid);
  const deleteProduct = await manager.deleteOne(pid);
  res.send(deleteProduct);
});

module.exports = productsRouter