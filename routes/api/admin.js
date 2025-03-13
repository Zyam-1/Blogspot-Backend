const express = require("express");
const router = express.Router();
const isAdmin = require("../../middlewares/admin");
const authenticate = require("../../middlewares/auth");
const { Blog } = require("../../models/Blog");
const User = require("../../models/User");

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

//get a user by its id

module.exports = router;
