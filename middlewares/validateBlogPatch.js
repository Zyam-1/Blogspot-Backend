const { validateBlogPatch } = require("../models/Blog");

function validateBlogPatchReq(req, res, next) {
  const { error } = validateBlogPatch(req.body);
  if (error) return res.status(400).send([error.details[0].message]);
  next();
}

module.exports = validateBlogPatchReq;
