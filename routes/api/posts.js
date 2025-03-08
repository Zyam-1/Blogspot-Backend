const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Blog = require("../../models/Blog");

// const mongoose = require("mongoose");
const { isObjectIdOrHexString, isValidObjectId } = require("mongoose");

router.get("/", async (req, res) => {
  try {
    let blogs = await Blog.find().populate("comments").populate("author");
    return res.send(blogs);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  let _id = req.params.id;
  // to check if the Object ID Is valid or not
  // try catch can also be used
  if (isObjectIdOrHexString(_id)) {
    let blog = await Blog.find({ _id: _id })
      .populate("comments")
      .populate("author");
    if (blog.length == 0) {
      return res.status(404).send(["Blog Not Found"]);
    }
    return res.send(blog);
  } else {
    return res.status(400).send(["Invalid ID format"]);
  }
});

router.post("/", async (req, res) => {
  console.log(req);
  try {
    let blog = new Blog();
    blog.title = req.body.title;
    blog.content = req.body.content;
    blog.author = req.body.author;
    console.log(blog);
    await blog.save();
    return res.send(blog);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  let _id = req.params.id;
  if (isObjectIdOrHexString(_id)) {
    let blog = await Blog.findOneAndDelete({ _id });
    if (blog) {
      return res.send(blog);
    } else {
      return res.status(404).send(["Blog Not Found"]);
    }
  } else {
    return res.status(400).send(["Invalid ID format"]);
  }
});

router.patch("/:id", async (req, res) => {
  let _id = req.params.id;
  let update = req.body;
  console.log(update);

  try {
    // check if the update is empty
    if (Object.keys(update).length == 0) {
      return res.status(400).send(["Can't accept an empty object"]);
    }
    if (isObjectIdOrHexString(_id)) {
      let blog = await Blog.findOneAndUpdate(
        { _id },
        { $set: { ...update, updatedAt: new Date() } },
        { new: true },
      );
      if (blog) {
        return res.send(blog);
      }
      return res.status(404).send(["Blog not found"]);
    } else {
      res.status(400).send(["Invalid ID Format"]);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
