const Comment = require("../models/Comment");
const { isObjectIdOrHexString } = require("mongoose");

async function checkCommentOwn(req, res, next) {
  let commentID = req.params.id;
  let userID = req.user.id;
  let role = req.user.role;
  console.log("Comment ID", commentID);

  if (!commentID) {
    return res.status(400).send(["Comment ID is required."]);
  }

  if (!isObjectIdOrHexString(commentID)) {
    return res.status(400).send(["Invalid Comment ID."]);
  }

  let user = await Comment.findOne({ _id: commentID }, "user");
  console.log("User", user);

  if (userID == user.user || role == "admin") {
    next();
  } else {
    return res.status(403).send(["Unauthorized"]);
  }
}

module.exports = checkCommentOwn;
