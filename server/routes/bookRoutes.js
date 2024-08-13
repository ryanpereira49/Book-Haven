const express = require('express')
const router = express.Router()
const cors = require('cors')
const dotenv = require("dotenv").config();
const {books,details,recommendation} = require('../controllers/bookControllers')

//Middleware
router.use(
    cors({
        credentials: true,
        origin: process.env.DOMAIN
    })
)

router.get('/books', books)
router.post('/details',details)
router.post('/recommendation',recommendation)

module.exports = router