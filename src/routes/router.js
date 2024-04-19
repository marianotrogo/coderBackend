const templateControlers = require('../controllers/template.controllers')
const userController = require('../controllers/users.controller')

const router = app =>{
    app.use('/', templateControlers) 
    app.use('realTimeProducts', templateControlers)
    app.use('/users', userController)
}


module.exports = router