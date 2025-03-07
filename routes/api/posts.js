const express = require("express");
const router = express.Router();
const Blog = require("../../models/Blog");
const mongoose = require("mongoose");


router.get("/", async (req, res)=>{
    let blogs = await Blog.find();
    return res.send(blogs);
})

module.exports = router;