const BookMini = require("../models/BookMini");
const fs = require('fs');

// Returns all books list
const books = async(req, res) => {
    const books = await BookMini.find({})
    res.json(books)
  };

  module.exports = {
    books
  } 