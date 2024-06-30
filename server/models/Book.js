const mongoose = require('mongoose')
const {Schema} = mongoose

const bookSchema = new Schema({
    title: {
        type: String,
    },
    author: {
        type: String,
    },
    publisher: {
        type: String,
    },
    overview: {
        type: String,
    },
    isbn_13: {
        type: String,
    },
    isbn_10: {
        type: String,
    },
    page_count: {
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
    image_lg:{
        type: String
    }
})

const BookModel = mongoose.model('Book',bookSchema)

module.exports = BookModel