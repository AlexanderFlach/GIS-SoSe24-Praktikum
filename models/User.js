const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pin: {
        type: Number,
        required: true,
        max: 9999
    }
})

module.exports = mongoose.model("User", userSchema)
