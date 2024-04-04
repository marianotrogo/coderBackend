const templatesController = require('../controller/templates.controller')
const usersController = require('../controller/users.controller')


const router = app => {
    app.use('/', templatesController),
    app.use('/users', usersController)
}





module.exports = router