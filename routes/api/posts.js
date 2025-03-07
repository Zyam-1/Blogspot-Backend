const express = require("express");
const router = express.Router();
const Blog = require("../../models/Blog");
// const mongoose = require("mongoose");
const {isObjectIdOrHexString} = require("mongoose");

router.get("/", async (req, res)=>{
    try {
        let blogs = await Blog.find().populate("comments").populate("author");
        return res.send(blogs);
    } catch (error) {
        return res.send(error);
    }

});

router.get("/:id", async(req, res)=>{
    let _id = req.params.id;
    // to check if the Object ID Is valid or not
    // try catch can also be used
    if(isObjectIdOrHexString(_id)){
        let blog = await Blog.find({_id: _id}).populate("comments").populate("author");
        if(blog.length == 0){
            return res.status(404).send(["Blog Not Found"]);
        }
        return res.send(blog);
    }else{
        return res.status(400).send(["Invalid ID format"]);
    }

})

router.post("/", async(req, res)=>{
    console.log(req);
})

module.exports = router;