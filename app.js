var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var seedDatabase = require("./seeders/seed");
require("dotenv").config();
// console.log(process.env);

var postsRouter = require("./routes/api/posts");
var usersRouter = require("./routes/api/users");
var commentRouter = require("./routes/api/comments");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use('/', indexRouter);
app.use("/api/users/", usersRouter);
app.use("/api/blogs/", postsRouter);
app.use("/api/comments/", commentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connection Successful");
  } catch (error) {
    console.log(error);
  }
};

connectToDB();

//unCheck this if you want to seed fake data in db
// seedDatabase();

module.exports = app;
