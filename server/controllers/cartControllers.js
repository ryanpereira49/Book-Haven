const BookMini = require("../models/BookMini");
const User = require("../models/User");

const fetch = async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).send("User not found");
    res.json(user.cart);
  } catch (error) {
    res.status(500).send(error);
  }
};

const loadCart = async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).send("User not found");

    // Extract ISBNs and quantities from the cart items
    const cartItems = user.cart.map((item) => ({
      isbn: item.product,
      quantity: item.quantity,
    }));

    // Find books matching the ISBNs
    const isbns = cartItems.map((item) => item.isbn);
    const books = await BookMini.find({ isbn_13: { $in: isbns } });

    // Map books to include the quantity
    const booksWithQuantity = books.map((book) => {
      const cartItem = cartItems.find((item) => item.isbn === book.isbn_13);
      return {
        ...book._doc,
        quantity: cartItem ? cartItem.quantity : 0,
      };
    });

    // Send the list of books with quantities
    res.status(200).json(booksWithQuantity);
  } catch (error) {
    res.status(500).send(error);
  }
};

const add = async (req, res) => {
  try {
    const { username, product } = req.body;

    const quantity = 1

    const user = await User.findOne({ username });
    if (!user) return res.status(404).send("User not found");

    const existingItem = user.cart.find((item) => item.product === product);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ product, quantity });
    }

    await user.save();

    res.json({success:"Added to Cart"});
  } catch (error) {
    res.status(500).send(error);
  }
};

const remove = async (req, res) => {
  const { username, product } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).send("User not found");

    user.cart = user.cart.filter((item) => item.product !== product);

    await user.save();
    res.json({success:"Removed from Cart"})
  } catch (err) {
    res.status(500).send(err);
  }
};

const increment = async (req, res) => {
  const { username, product } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).send("User not found");

    const item = user.cart.find((item) => item.product === product);
    if (item) {
      item.quantity += 1;
    }

    await user.save();

    const cartItems = user.cart.map((item) => ({
      isbn: item.product,
      quantity: item.quantity,
    }));

    // Find books matching the ISBNs
    const isbns = cartItems.map((item) => item.isbn);
    const books = await BookMini.find({ isbn_13: { $in: isbns } });

    // Map books to include the quantity
    const booksWithQuantity = books.map((book) => {
      const cartItem = cartItems.find((item) => item.isbn === book.isbn_13);
      return {
        ...book._doc,
        quantity: cartItem ? cartItem.quantity : 0,
      };
    });

    // Send the list of books with quantities
    res.status(200).json(booksWithQuantity);
  } catch (err) {
    res.status(500).send(err);
  }
};

const decrement = async (req, res) => {
  const { username, product } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).send("User not found");

    const item = user.cart.find((item) => item.product === product);
    if (item) {
      item.quantity -= 1;
      if (item.quantity <= 0) {
        user.cart = user.cart.filter((item) => item.product !== product);
      }
    }

    await user.save();
    
    const cartItems = user.cart.map((item) => ({
      isbn: item.product,
      quantity: item.quantity,
    }));

    // Find books matching the ISBNs
    const isbns = cartItems.map((item) => item.isbn);
    const books = await BookMini.find({ isbn_13: { $in: isbns } });

    // Map books to include the quantity
    const booksWithQuantity = books.map((book) => {
      const cartItem = cartItems.find((item) => item.isbn === book.isbn_13);
      return {
        ...book._doc,
        quantity: cartItem ? cartItem.quantity : 0,
      };
    });

    // Send the list of books with quantities
    res.status(200).json(booksWithQuantity);

  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  fetch,
  loadCart,
  add,
  remove,
  increment,
  decrement,
};
