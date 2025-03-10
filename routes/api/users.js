var express = require("express");
var router = express.Router();
var User = require("../../models/User");

// register route
router.post("/register", async function (req, res, next) {
  // res.send("respond with a resource");
  let { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).send(["User already exists"]);
    }
    user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    await user.encryptPassword();
    await user.save();
    return res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(["Internal Server Error"]);
  }
});

// login route
router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let isValid;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send(["User not found"]);
    }
    isValid = await user.comparePassword(password);
    if (!isValid) {
      return res.status(400).send(["Password doesn't match"]);
    }
    return res.status(200).send(user.generateToken());
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// get all users. Only admin can access this route

router.get("/all", async (req, res) => {
  try {
    let users = await User.find({}, "name email role");
    return res.status(200).send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send(["Internal Server Errir"]);
  }
});

module.exports = router;
