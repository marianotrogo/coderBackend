const { Router, json } = require('express')
const ProductManager = require('../productManager')

const productsRouter = Router();

const manager = new ProductManager();

productsRouter.use(json());

productsRouter.get("/", async (req, res) => {
  try {
    const products = await manager.getProducts();
    const { limit } = req.query;

    if (limit) {
      products.length = limit;
      return res.send(products);
    } else {
      res.send({status: 'ok', payload: products});
    }
  } catch (e) {
    res.status(404).send(`${e}`);
  }
});

productsRouter.get("/:pid", async (req, res) => {
  let num = req.params.pid;
  const products = await manager.findOne(num);
  res.send({status: 'ok', payload: products});
});

productsRouter.post("/add", async (req, res) => {
  const {title, description, price,code,stock} = req.body;
  const newProd = await manager.addProducts(
    title,
    description,
    price,
    code,
    stock
  )
  res.send({status:'ok', payload: newProd})
})


productsRouter.put("/:pid", async (req, res) => {
  let pid = req.params.pid;
  const { title, description, price, code, stock } = req.body;
  const updated = await manager.updateOne(
    pid, 
    title,
    description,
    price,
    code,
    stock
  
  );
  res.send({status: 'ok', payload: updated});
});

productsRouter.delete("/:pid", async (req, res) => {
  let pid = req.params.pid;
  const deleteProduct = await manager.deleteOne(pid);
  res.send({status: 'ok', payload: deleteProduct + 'Producto Eliminado'});
});

module.exports = productsRouter