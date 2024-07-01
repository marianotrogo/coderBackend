const { Router } = require('express')
const ProductManager = require('../productManager')
const ProductModel = require('../dao/models/products.model')
const { getAllProducts } = require('./products.controllers')
const { urlencoded } = require('body-parser')

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

router.get('/products', async (req, res) => {
    const limit = parseInt(req.query.limit, 10) || 10
    const page = parseInt(req.query.page) || 1
    try {
        const products = await ProductModel.paginate({}, {page, limit})
        
        res.render('products', { products })

    } catch (error) {
        console.log(error);
    }
})

router.get('/login', (req,res)=>{
    res.render('login')
})

router.get('/signUp', (req,res)=>{
    res.render('signup')
})

module.exports = router