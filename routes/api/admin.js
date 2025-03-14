const express = require("express");
const router = express.Router();
const isAdmin = require("../../middlewares/admin");
const authenticate = require("../../middlewares/auth");
const { Blog } = require("../../models/Blog");
const User = require("../../models/User");
const Comment = require("../../models/Comment");

// get all users
router.get("/users", authenticate, isAdmin, async (req, res) => {
  try {
    let users = await User.find({}, "name email role password");
    return res.status(200).send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send(["Internal Server Error"]);
  }
});

router.delete("/users/:userID", authenticate, isAdmin, async (req, res) => {
  let _id = req.params.userID;

  if (!_id) {
    return res.status(400).send(["User ID is required"]);
  }

  if (!isObjectIdOrHexString(_id)) {
    return res.status(400).send(["Invalid User ID"]);
  }

  try {
    let user = await User.findOne({ _id });
    if (user.length == 0) {
      return res.status(404).send(["User not found"]);
    }
    await user.remove();
    return res.status(200).send(["User deleted"]);
  } catch (error) {
    console.error(error);
    return res.status(500).send(["Internal Server Error"]);
  }
});

// get a specfic user. Only admin can access this route
//
// router.get("/users/:userID", authenticate, isAdmin, async (req, res) => {
//   let _id = req.params.userID;

//   if (!_id) {
//     return res.status(400).send(["User ID is required"]);
//   }

//   if (!isObjectIdOrHexString(_id)) {
//     return res.status(400).send(["Invalid User ID"]);
//   }

//   try {
//     let user = await User.findOne({ _id });
//     if (user.length == 0) {
//       return res.status(404).send(["User not found"]);
//     }
//     return res.status(200).send(user);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send(["Internal Server Error"]);
//   }
// });

// update a specfic user. Only admin can access this route
//
router.put("/users/:userID", authenticate, isAdmin, async (req, res) => {
  let _id = req.params.userID;

  if (!_id) {
    return res.status(400).send(["User ID is required"]);
  }

  if (!isObjectIdOrHexString(_id)) {
    return res.status(400).send(["Invalid User ID"]);
  }

  try {
    let user = await User.findOne({ _id });
    if (user.length == 0) {
      return res.status(404).send(["User not found"]);
    }
    user.name = req.body.name;
    user.email = req.body.email;
    user.role = req.body.role;
    user.password = req.body.password;
    await user.encryptPassword();
    await user.save();
    return res.status(200).send(["User updated"]);
  } catch (error) {
    console.error(error);
    return res.status(500).send(["Internal Server Error"]);
  }
});

//get all the comments of a user. Only admin can access this route
//
router.get(
  "/users/:userID/comments",
  authenticate,
  isAdmin,
  async (req, res) => {
    let _id = req.params.userID;

    if (!_id) {
      return res.status(400).send(["User ID is required"]);
    }

    if (!isObjectIdOrHexString(_id)) {
      return res.status(400).send(["Invalid User ID"]);
    }

    try {
      let user = await User.findOne({ _id });
      if (user.length == 0) {
        return res.status(404).send(["User not found"]);
      }
      let comments = await Comment.find({ user: _id });
      return res.status(200).send(comments);
    } catch (error) {
      console.error(error);
      return res.status(500).send(["Internal Server Error"]);
    }
  },
);

module.exports = router;
