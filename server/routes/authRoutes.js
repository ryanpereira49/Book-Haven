const express = require('express')
const router = express.Router()
const cors = require('cors')
const {helloworld, login, register} = require('../controllers/authControllers')

//Middleware
router.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173"
    })
)

router.get('/helloworld', helloworld)
router.post('/login',login)
router.post('/register',register)

module.exports = router