const BookMini = require("../models/BookMini");
const User = require("../models/User");

const fetch = async (req, res) => {
    const {username} = req.body
    try{
        const user = await User.findOne({ username });
        if (!user) return res.status(404).send('User not found');
        res.json(user.cart)
    }catch(error){
        res.status(500).send(error);
    }
  };

  const add = async (req, res) => {
    try{

        const {username, product, quantity} = req.body

        const user = await User.findOne({ username });
        if (!user) return res.status(404).send('User not found');
        
        const existingItem = user.cart.find(item => item.product === product);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            user.cart.push({ product, quantity });
        }

        await user.save();

        res.json(user.cart)

    }catch(error){
        res.status(500).send(error);
    }
  }

  const remove = async (req, res) => {
    const {username, product} = req.body

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(404).send('User not found')

        user.cart = user.cart.filter(item => item.product !== product);

        await user.save();
        res.status(200).send(user.cart);
    } catch (err) {
        res.status(500).send(err);
    }

  }

  const increment = async (req, res) => {
    const {username, product} = req.body

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(404).send('User not found')

            const item = user.cart.find(item => item.product === product);
            if (item) {
                item.quantity += 1;
            }
    
            await user.save();
            res.status(200).send(user.cart);
    } catch (err) {
        res.status(500).send(err);
    }

  }

  const decrement = async (req, res) => {
    const {username, product} = req.body

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(404).send('User not found')

            const item = user.cart.find(item => item.product === product);
            if (item) {
              item.quantity -= 1;
              if (item.quantity <= 0) {
                user.cart = user.cart.filter((item) => item.product !== product);
              }
            }
    
            await user.save();
            res.status(200).send(user.cart);
    } catch (err) {
        res.status(500).send(err);
    }
  }

  module.exports = {
    fetch,
    add,
    remove,
    increment,
    decrement
  };