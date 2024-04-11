const { Router, json } = require('express')
const ProductManager = require('../productManager')


const item = new ProductManager(process.cwd() + "product.json");

const viewsRouter = Router();

viewsRouter.get("/", async (req, res) => {
    // const prods = await item.getProducts();
    res.render('home');
})

viewsRouter.get('/realTimeProducts', async (req, res) => {
    const prods = await item.getProducts();
    res.render('realTimeProducts', {prods});
})

module.exports = viewsRouter

