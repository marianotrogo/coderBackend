const {Router} = require('express')
const ProductManager = require('../productManager')

const item = new ProductManager()

const router = Router()

router.get('/', async (req,res)=>{
    const prods = await item.getProducts();
    res.render('home', {prods})
})

router.get('/realTimeProducts', async(req,res)=>{
    const prods = await item.getProducts();
    res.render('realTimeProducts', {prods})
})

module.exports = router