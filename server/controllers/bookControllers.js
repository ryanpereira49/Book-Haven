const Book = require("../models/Book");
const fs = require('fs');

// Returns all books list
const books = async(req, res) => {
    const books = await Book.find({})
    res.json(books)
  };

  module.exports = {
    books
  } 