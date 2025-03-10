const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// a custom method that will encrypt the password
userSchema.methods.encryptPassword = async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
};

//compare password

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//generate jwt token
userSchema.methods.generateToken = function () {
  console.log(process.env.JWTKEY);
  const token = jwt.sign(
    { id: this._id, email: this.email, name: this.name, role: this.role },
    process.env.JWTKEY,
  );
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
