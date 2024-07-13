const BookMini = require("../models/BookMini");
const Book = require("../models/Book");
const fs = require('fs');

// Returns all books list
const books = async(req, res) => {
    const books = await BookMini.find({})
    res.json(books)
  };

// Return details of books based on ISBN recieved
// IN  - ISBN_13
// OUT - BOOK DETAILS
const details = async(req,res) => {

  const {isbn} = req.body

  try {
    const book = await Book.findOne({ isbn_13: isbn });
    if (!book) {
      return res.status(404).send("Book not found");
    }
    res.status(200).json(book);
  } catch (err) {
    res.status(500).send("Server error");
  }
  
}

// Return a list of books randomly based on the category recieved 
// IN  - category, isbn
// OUT - few random books
const recommendation = async(req,res) => {
  const {category, isbn} = req.body

  try{
    const book = await BookMini.aggregate([
      { $match: { category: category, isbn_13: { $ne: isbn } } }, // Match books with the same category but different ISBN
      { $sample: { size: 5 } } // Randomly select 5 books
    ]);
    res.json(book)
  }catch(error){
    res.status(404).send("Book not found");
  }
}

  module.exports = {
    books,
    details,
    recommendation
  } 