const mongoose = require("mongoose");
const { Blog } = require("./Blog");

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

commentSchema.post("findOneAndDelete", async function (doc) {
  try {
    let blogID = doc.blog;
    if (!blogID) {
      return;
    }
    await Blog.findByIdAndUpdate(blogID, { $pull: { comments: this._id } });
  } catch (err) {
    console.error(err);
  }
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
