const { Blog } = require("../models/Blog");

async function checkBlogOwn(req, res, next) {
  let userID = req.user.id;
  let currentUserRole = req.user.role;
  let blogID = req.params.id;
  let blog = await Blog.findOne({ _id: blogID }, "author");

  if (currentUserRole == "admin" || userID == blog.author) {
    next();
  } else {
    return res.status(403).send(["UnAuthorised"]);
  }
}

module.exports = checkBlogOwn;
