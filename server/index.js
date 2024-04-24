const express = require('express');
const dotenv = require('dotenv').config()
const {mongoose} = require('mongoose')
const cookieParser = require('cookie-parser')

const app = express();

// Database Connection
mongoose.connect(process.env.MONGO_URL_LOCAL).then(() => console.log('Database Connected')).catch((err)=> console.log('Database Not Connected',err))

// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))


app.use('/', require('./routes/authRoutes'))

const PORT = process.env.port || 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))