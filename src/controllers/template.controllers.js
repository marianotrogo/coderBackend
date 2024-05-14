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

router.get('/products', (req,res)=>{
    
    res.render('products.handlebars', {getAllProducts})
})

// hay que corrregir aqui// se renderiza lo de products y no lo de products controller

module.exports = router