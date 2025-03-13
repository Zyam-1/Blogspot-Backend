const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { Blog } = require("../../models/Blog");
const validateBlogData = require("../../middlewares/validateBlog");
const validateBlogPatchReq = require("../../middlewares/validateBlogPatch");
const { isObjectIdOrHexString } = require("mongoose");

router.get("/", async (req, res) => {
  try {
    let blogs = await Blog.find()
      .populate({
        path: "comments",
        select: "content user",
        populate: {
          path: "user",
          select: "name",
        },
      })
      .populate("author", "name");
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
      .populate({
        path: "comments",
        select: "content user",
        populate: {
          path: "user",
          select: "name",
        },
      })
      .populate("author", "name");
    if (blog.length == 0) {
      return res.status(404).send(["Blog Not Found"]);
    }
    return res.send(blog);
  } else {
    return res.status(400).send(["Invalid ID format"]);
  }
});

// only a logged in user can post a blog

router.post("/", validateBlogData, async (req, res) => {
  // console.log(req);
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

// only the author and admin can delete this
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

// only the author and admin can delete this
router.patch("/:id", validateBlogPatchReq, async (req, res) => {
  let _id = req.params.id;
  let update = req.body;
  // console.log(update);

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

//get blogs of a specific author

router.get("/author/:authorID", async (req, res) => {
  let authorID = req.params.authorID;
  if (!authorID) {
    return res.status(400).send(["Author ID is required"]);
  }

  if (!isObjectIdOrHexString(authorID)) {
    res.status(400).send(["Invalid ID Format"]);
  }

  try {
    let blogs = await Blog.find({ author: authorID });
    return res.status(200).send(blogs);
  } catch (error) {
    console.error(error);
    return res.status(500).send(["Internal Server Error"]);
  }
});
module.exports = router;
