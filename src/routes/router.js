const templateControlers = require('../controllers/template.controllers')
const usersController = require('../controllers/users.controller')
const productsController = require('../controllers/products.controllers')
const messagesControllers = require('../controllers/messages.controllers')
const authControllers = require('../controllers/auth.controllers')
const signup = require('../controllers/userSign.controllers')

const router = app =>{
    app.use('/', templateControlers) 
    app.use('realTimeProducts', templateControlers)
    app.use('/users', usersController)
    app.use('/prods', productsController)
    app.use('/messages', messagesControllers)
    app.use('/auth', authControllers)
    app.use('/signup', signup)
}


module.exports = router