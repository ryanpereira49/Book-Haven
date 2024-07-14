const mongoose = require('mongoose')
const {Schema} = mongoose

const cartItemSchema = new Schema({
    product: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    }
});


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
    },
    cart: {
        type: [cartItemSchema],
        default: []
    }
})

const UserModel = mongoose.model('User',userSchema)

module.exports = UserModel