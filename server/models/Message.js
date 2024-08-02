const mongoose = require('mongoose')
const {Schema} = mongoose

const MessageSchema = new Schema({
    name: {
        type: String,
    },
    email:{
        type: String,
    },
    message:{
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const MessageModel = mongoose.model('Message',MessageSchema)

module.exports = MessageModel