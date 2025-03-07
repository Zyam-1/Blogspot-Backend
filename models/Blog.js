var mongoose = require("mongoose");


const blogSchema = new mongoose.Schema({
    title: { 
        type :String, required: true, trim: true
     },
    content: { 
        type: String, required: true 
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, // References the User collection
        ref: 'User', // Links to the User model
        required: true
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt : {type: Date, default: Date.now},
    comments: [{
        type: mongoose.Schema.Types.ObjectId, // References the Comment collection
        ref: "Comment"
    }]
})

const blog = mongoose.model('Blog', blogSchema);


module.exports = blog;