const express = require("express");
const router = express.Router();
const { isObjectIdOrHexString } = require("mongoose");
const Comment = require("../../models/Comment");
const blogExists = require("../../middlewares/blogExists");
const Blog = require("../../models/Blog");

// get all comments from blog id
router.get("/:id", async (req, res) => {
  try {
    let _id = req.params.id;
    if (!_id) {
      return res.status(400).send(["Invalid ID"]);
    }

    if (!isObjectIdOrHexString(_id)) {
      return res.status(400).send(["Invalid ID"]);
    }

    let comments = await Comment.find({ blog: _id });
    return res.status(200).send(comments);
  } catch (error) {
    console.error(error);
    return res.status(500).send(["Internal Server Error"]);
  }
});
// delete a specfic comment from comment id
router.delete("/:id", async (req, res) => {
  let _id = req.params.id;
  if (!_id) {
    return res.status(400).send(["Invalid ID"]);
  }

  if (!isObjectIdOrHexString(_id)) {
    return res.status(400).send(["Invalid ID"]);
  }

  try {
    let comment = await Comment.findOneAndDelete({ _id });
    if (!comment) {
      return res.status(404).send(["Comment not found"]);
    }
    return res.status(200).send(comment);
  } catch (error) {
    console.log(error);
    return res.status(500).send(["Internal Server Error"]);
  }
});

// post a comment to a blog id
router.post("/:id", blogExists, async (req, res) => {
  let _id = req.params.id;
  if (!_id) {
    return res.status(400).send(["Invalid ID"]);
  }

  if (!isObjectIdOrHexString(_id)) {
    return res.status(400).send(["Invalid ID"]);
  }
  try {
    let comment = new Comment();
    comment.blog = _id;
    comment.user = req.body.user_id;
    comment.content = req.body.content;
    await comment.save();
    await Blog.findOneAndUpdate({ _id }, { $push: { comments: comment._id } });
    await comment.populate("user");
    return res.status(201).send(comment);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});

module.exports = router;
