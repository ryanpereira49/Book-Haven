const express = require('express')
const router = express.Router()
const cors = require('cors')
const dotenv = require("dotenv").config();
const {helloworld, login, register,logout, getProfile} = require('../controllers/authControllers')

//Middleware
router.use(
    cors({
        credentials: true,
        origin: process.env.DOMAIN
    })
)

router.get('/helloworld', helloworld)
router.post('/login',login)
router.post('/register',register)
router.get('/profile',getProfile)
router.get('/logout',logout)

module.exports = router