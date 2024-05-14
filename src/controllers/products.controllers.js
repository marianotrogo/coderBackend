const { Router, json } = require('express')
const ProductModel = require('../dao/models/products.model')
const ProductManager = require('../dao/mongo/products.dao.manager')
const productsFiles = require('../files/product')
const { urlencoded } = require('body-parser')


const manager = new ProductManager()

const prodRouter = Router()

prodRouter.use(json())

prodRouter.use(urlencoded({ extended: true }))


 getAllProducts = async(req,res)=>{
    try {
        const {limit, page, filter, ord} = req.query
        let metFilter
        const pag = page !== undefined ? page : 1
        const limi = limit !== undefined ? limi: 10

        if (filter == 'true' || filter == 'false'){
            metFilter = 'status'
        }else{
            if(filter !== undefined)
                metFilter = 'category'
        }

        const query = metFilter != undefined ? {[metFilter]: filter}:{}
        const ordQuery = ord !== undefined ? {price: ord} : {}
        const prods = await ProductModel.paginate(query, {limit: limi, page: pag, sort: ordQuery})
        res.status(200).json(prods)
    } catch (error) {
        res.send(error)
        
    }
}



// prodRouter.get('/', async (req, res) => {
//     try {
//         const getAllproducts = async ()=>{

//             const limit = parseInt(req.query.limit, 10) || 10;
//             const page = parseInt(req.query.page, 10) || 1;
//             const products = await ProductModel.paginate({}, { limit, page }, { __v: 0 })
//             const {totalPages, prevPages, nextPages, hasPrevPages, hasNextPages} = await ProductModel.paginate({})
//             res.send({status: 'Success',
//              payload: products,
//              totalPages,
//              prevPages,
//              nextPages,
//              page,
//              hasPrevPages,
//              hasNextPages,

//             })
//         }

//         getAllproducts()
//     } catch (error) {

//     }
  

// })



prodRouter.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const product = await ProductModel.findOne({ _id: id, status: true })
        res.json({ payload: product })
    } catch (error) {
        res.json({ error })

    }
})



prodRouter.get('/:title', async (req, res) => {
    try {
        const { title } = req.params
        const product = await ProductModel.findOne({ title: title }, { __v: 0 })
        res.json({ status: 'success', payload: product })
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

prodRouter.post('/batch', async (req, res) => {
    try {
        await ProductModel.insertMany(productsFiles)
        res.json({ status: 'Succes', payload: 'Agregados Correctamente' })
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