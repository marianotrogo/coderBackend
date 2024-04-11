const templateControlers = require('../controllers/template.controllers')

const router = app =>{
    app.use('/', templateControlers) 
    app.use('realTimeProducts', templateControlers)
}


module.exports = router