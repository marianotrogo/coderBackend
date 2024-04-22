const { Router, json } = require('express')
const ProductModel = require('../dao/models/products.model')
const ProductManager = require('../dao/mongo/products.dao.manager')

const manager = new ProductManager()

const prodRouter = Router()

prodRouter.use(json())

prodRouter.get('/', async (req, res) => {
    try {
        const allProducts = await ProductModel.find({ status: true })
        res.json({ payload: allProducts })
    } catch (error) {
        res.json({ error })
    }
})

prodRouter.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const product = await ProductModel.findOne({ _id: id, status: true })
        res.json({ payload: product })
    } catch (error) {
        res.json({ error })

    }
})

prodRouter.post('/', async (req, res) => {
    try {
        const { title, description, price, code, stock } = req.body

        const newProd = {
            title,
            description,
            price,
            code,
            stock
        }

        const newProduct = await ProductModel.create(newProd)
        res.json({ payload: newProduct })
    } catch (error) {
        res.json({ error })
    }
})

prodRouter.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const body = req.body

        await ProductModel.updateOne({ _id: id, status: true })
        res.json({ payload: 'Producto Actualizado' })
    } catch (error) {
        res.json({ error })
    }
})

prodRouter.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        await ProductModel.updateOne({ _id: id, status: false })
        res.json({ payload: 'Producto Eliminado' })
    } catch (error) {
        res.json({ error })
    }
})

module.exports = prodRouter