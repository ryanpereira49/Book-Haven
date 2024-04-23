const express = require('express');
const dotenv = require('dotenv').config()
const cors = require('cors')
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
app.use('/template',require('./routes/templateRoutes'))
app.use('/project',require('./routes/projectRoutes'))
app.use('/admin',require('./routes/adminRoutes'))

const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`))