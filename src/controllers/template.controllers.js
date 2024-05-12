const { Router } = require('express')
const ProductManager = require('../productManager')
const ProductModel = require('../dao/models/products.model')
const prodRouter = require('./products.controllers')

const agregate = new prodRouter()

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

// hay que corrregir aqui// se renderiza lo de products y no lo de products controller
router.get('/products', async (req, res) => {
    const prodsPaginate = await agregate.getAllProducts()
    res.render('products', {prodsPaginate})
    // const { page = 1 } = req.query
    // const { docs, hasPrevPage, hasNextPage, nextPage, prevPage, totalPages } = await ProductModel.paginate({}, { page, limit: 5, lean: true })

    // const products = docs;
    // res.render('products',{
    //     products,
    //     page,
    //     hasNextPage,
    //     hasPrevPage,
    //     nextPage,
    //     prevPage,
    //     totalPages
    // })
})

module.exports = router