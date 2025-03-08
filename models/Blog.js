var mongoose = require("mongoose");
var Comment = require("./Comment");


const blogSchema = new mongoose.Schema({
    title: {
        type: String, required: true, trim: true
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
    updatedAt: { type: Date, default: Date.now },
    comments: [{
        type: mongoose.Schema.Types.ObjectId, // References the Comment collection
        ref: "Comment"
    }]
});

// This pre middle win run when the findOneAndDelete function will run
// it will run before the findOneAndDelete function.
//Here I'm deteting all the comemnts of the blog.
//the pre function won't work on findByIdAndDelete
blogSchema.pre("findOneAndDelete", async function(next){
    let {_id} = this.getFilter()
    let blog = await this.model.findOne({_id});

    if(blog){
        await Comment.deleteMany({_id : {$in: blog.comments}});
    }
    next();
})

const blog = mongoose.model('Blog', blogSchema);


module.exports = blog;