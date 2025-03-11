const { validateBlog } = require("../../models/Blog");

function validateBlogData(req, res, next) {
  const { error } = validateBlog(req.body);
}
