const { Router, json } = require('express')
const ProductModel = require('../dao/models/products.model')
const ProductManager = require('../dao/mongo/products.dao.manager')
const productsFiles = require('../files/product')
const { urlencoded } = require('body-parser')


const manager = new ProductManager()

const prodRouter = Router()

prodRouter.use(json())

prodRouter.use(urlencoded({ extended: true }))

prodRouter.get('/', async (req, res) => {
    try {
        const allProducts = await ProductModel.find({}, { __v: 0 })
        res.json({ status: 'true', payload: allProducts })
    } catch (error) {
        res.json({ error })
    }
})

prodRouter.get('/agregate', async (req, res) => {
    const options = {
        page: 1,
        limit: 4
    }

    const { docs, page, hasPrevPage, hasNextPage, nextPage, prevPage, totalPages } = await ProductModel.paginate({}, options)

    const products = docs
    res.render('products', {
        products,
        page,
        hasNextPage,
        hasPrevPage,
        nextPage,
        prevPage,
        totalPages
    })



    // try {
    //     const { page = 1 } = req.query
    //     const { docs, hasPrevPage, hasNextPage, nextPage, prevPage, totalPages } = await ProductModel.paginate({}, { page, limit: 5, lean: true })

    //     const products = docs;
    //     res.render('products',{
    //         products,
    //         page,
    //         hasNextPage,
    //         hasPrevPage,
    //         nextPage,
    //         prevPage,
    //         totalPages
    //     })

    // } catch (error) {

    // }

    //     try {
    //         const {limit, page, sort, query, price} = req.query

    //         const options = {
    //             limit : limit || 5,
    //             page: page || 1,
    //             sort: {price: sort === 'asc' ? 1 : -1},
    //             query: buildQuery(query)
    //         }



    //         const products = await ProductModel.find()

    //         const totalPages = await products.totalPages

    //         const prevPage = page > 1 ? page - 1 : null;
    //         const nextPage = page < totalPages ? page + 1 : null;


    //         const response = {
    //             status : 'success',
    //             payload: products,
    //             totalPages,
    //             nextPage,
    //             prevPage,
    //             page,
    //             hasPrevPage: prevPage !== null,
    //             hastNextPage: nextPage !== null,
    //             prevLink: prevPage !== null ? `/?page=${prevPage}` : null,
    //             nextLink: nextPage !== null ? `/?page=${nextPage}` : null,

    //         };
    //         res.send(response)

    //     } catch (error) {
    //         console.log(error);
    //     }
    // })
    // function buildQuery(query) {

    //     const filter = {};

    //     if (query) {
    //      if (query === "category") {
    //        filter.category = { $ne: null };
    //      } else if (query === "availability") {
    //        filter.stock = { $ne: 0 }; 
    //      } else {
    //        filter[query] = { $ne: null };
    //      }
    //     }

    //     return filter; 

    //    }
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