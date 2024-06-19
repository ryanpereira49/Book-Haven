const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    title: {
        type: String,
    },
    author:{
        type: String,
    },
    password: String,
    role: {
        type: String,
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const UserModel = mongoose.model('User',userSchema)

module.exports = UserModel