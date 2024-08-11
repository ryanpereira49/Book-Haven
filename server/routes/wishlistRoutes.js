const express = require('express')
const router = express.Router()
const cors = require('cors')
const {get, add, remove, remove_min, load} = require('../controllers/wishlistControllers')

//Middleware
router.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173"
    })
)

router.post('/get',get)
router.post('/add',add)
router.post('/remove',remove)
router.post('/remove_min',remove_min)
router.post('/load',load)

module.exports = router