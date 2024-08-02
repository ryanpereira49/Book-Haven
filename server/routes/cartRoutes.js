const express = require('express')
const router = express.Router()
const cors = require('cors')
const {fetch, loadCart, add, remove, increment, decrement} = require('../controllers/cartControllers')

//Middleware
router.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173"
    })
)

router.post('/fetch', fetch)
router.post('/load',loadCart)
router.post('/add',add)
router.post('/remove',remove)
router.post('/increment',increment)
router.post('/decrement',decrement)

module.exports = router