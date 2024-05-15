const { Router } = require('express')
const ProductManager = require('../productManager')
const ProductModel = require('../dao/models/products.model')
const {getAllProducts} = require('./products.controllers')



const item = new ProductManager()


const router = Router()

router.get('/', async (req, res) => {
    const prods = await item.getProducts();
    res.render('home', { prods })
})

router.get('/realTimeProducts', async (req, res) => {
    const prods = await item.getProducts();
    res.render('realTimeProducts', { prods })
})

router.get('/chat', (req, res) => {
    res.render('chat.handlebars')
})

router.get('/products', async (req,res)=>{
    const products = await getAllProducts()
    res.render('products.handlebars', {products})
})

// hay que corrregir aqui// se renderiza lo de products y no lo de products controller

module.exports = router