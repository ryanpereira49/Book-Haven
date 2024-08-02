const express = require('express')
const router = express.Router()
const cors = require('cors')
const {contact} = require('../controllers/MessageControllers')

//Middleware
router.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173"
    })
)

router.post('/contact',contact)

module.exports = router