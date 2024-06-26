const { Router } = require('express')
const Login = require('../dao/models/login.model')

const router = Router()

router.post('/', async (req, res) => {
    try {

        const { first_name, last_name, email, password } = req.body
        console.log(req.body);

        const newUserInfo = {
            
        }

        const user = await Login.findOne({ email })

        if (!user) return res.status(400).json('Bad Request')

        if (user.password !== password) return res.status(400).json('Bad Request')

        req.session.user = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
        }

        res.json({ status: 'Success', message: 'Sesion Iniciada' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'Error', message: 'Internal Server Error' })
    }

})

module.exports = router