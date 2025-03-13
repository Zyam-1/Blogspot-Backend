const { validateBlog } = require("../models/Blog");

function validateBlogData(req, res, next) {
  const { error } = validateBlog(req.body);
  if (error) {
    return res.status(400).send([error.details[0].message]);
  }
  next();
}

module.exports = validateBlogData;
