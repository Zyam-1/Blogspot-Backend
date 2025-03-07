const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name: {
        type: String, required: true, trim: true
    },
    email: {
        type: String, required: true, trim: true
    },
    role: {type: String, enum: ["user", "admin"], default: "user"},
    password:{
        type: String, required: true
    },
    createdAt: {
        type: Date, default: Date.now
    },
    updatedAt:{
        type: Date, default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;