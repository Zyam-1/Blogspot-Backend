const { Blog } = require("../models/Blog");
const { isObjectIdOrHexString } = require("mongoose");
async function blogExists(req, res, next) {
  let blogID = req.params.id;

  if (!blogID) {
    return res.status(400).send(["Blog ID is required."]);
  }
  if (!isObjectIdOrHexString(blogID)) {
    return res.status(400).send(["Invalid Blog ID."]);
  }

  let blog = await Blog.findOne({ _id: blogID });
  if (!blog)
    return res.status(404).send(["The blog with the given ID was not found."]);
  // req.blog = blog;
  next();
}

module.exports = blogExists;
