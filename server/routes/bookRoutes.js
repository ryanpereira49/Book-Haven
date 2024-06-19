const express = require('express')
const router = express.Router()
const cors = require('cors')
const {books} = require('../controllers/bookControllers')

//Middleware
router.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173"
    })
)

router.get('/books', books)

module.exports = router