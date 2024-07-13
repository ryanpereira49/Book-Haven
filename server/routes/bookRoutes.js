const express = require('express')
const router = express.Router()
const cors = require('cors')
const {books,details,recommendation} = require('../controllers/bookControllers')

//Middleware
router.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173"
    })
)

router.get('/books', books)
router.post('/details',details)
router.post('/recommendation',recommendation)

module.exports = router