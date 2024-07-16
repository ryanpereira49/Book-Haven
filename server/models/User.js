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
        default: 1
    }
});


const userSchema = new Schema({
    username: {
        type: String,
    },
    email:{
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