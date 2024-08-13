const User = require("../models/User");
const Book = require("../models/Book");

const get = async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).send("User not found");
    res.json(user.wishlist);
  } catch (error) {
    res.status(500).send(error);
  }
};

const add = async (req, res) => {
    const { username, product } = req.body;
    try {
      const user = await User.findOneAndUpdate(
        { username },
        { $addToSet: { wishlist: product } },  // $addToSet prevents duplicates
        { new: true }  // returns the updated document
      );
      if (!user) return res.status(404).send("User not found");
      res.json({"success":"Added to wishlist"});
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  const remove = async (req, res) => {
    const { username, product } = req.body;
    try {
      const user = await User.findOneAndUpdate(
        { username },
        { $pull: { wishlist: product } },  // $pull removes the item from the array
        { new: true }
      );
      if (!user) return res.status(404).send("User not found");
      const books = await Book.find({
        isbn_13: { $in: user.wishlist }
      });
      res.json(books);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  const remove_min = async (req, res) => {
    const { username, product } = req.body;
    try {
      const user = await User.findOneAndUpdate(
        { username },
        { $pull: { wishlist: product } },  // $pull removes the item from the array
        { new: true }
      );
      if (!user) return res.status(404).send("User not found");
      res.json({"success":"Removed from wishlist"});
    } catch (error) {
      res.status(500).send(error);
    }
  };

const load = async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).send("User not found");

    const books = await Book.find({
      isbn_13: { $in: user.wishlist }
    });

    res.json(books);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  get,
  add,
  remove,
  remove_min,
  load
};
