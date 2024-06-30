const mongoose = require('mongoose')
const {Schema} = mongoose

const bookminiSchema = new Schema({
    title: {
        type: String,
    },
    author: {
        type: String,
    },
    isbn_13: {
        type: String,
    },
    isbn_10: {
        type: String,
    },
    price: {
        type: String,
    },
    category: {
        type: String,
    },
    image_sm: {
        type: String
    },
})

const BookminiModel = mongoose.model('BookMini',bookminiSchema)

module.exports = BookminiModel