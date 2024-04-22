const templateControlers = require('../controllers/template.controllers')
const usersController = require('../controllers/users.controller')
const productsController = require('../controllers/products.controllers')

const router = app =>{
    app.use('/', templateControlers) 
    app.use('realTimeProducts', templateControlers)
    app.use('/users', usersController)
    app.use('/prods', productsController)
}


module.exports = router