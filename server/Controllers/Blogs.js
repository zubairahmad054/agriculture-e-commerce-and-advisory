const Blogs = require("../models/blogs.js");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

module.exports = {
  Create: async (req, res) => {
    console.log("HERE", req.body);
    try {
      const Blog = new Blogs(req.body);
      Blog.save();
      res.json({ status: "ok" });
    } catch (error) {
      res.json({ status: "error", error: "Duplicate URL" });
    }
  },
  AllBlogs: async (req, res) => {
    const blogs = await Blogs.find();
    if (blogs) {
      res.send(blogs).status(200);
    } else {
      res.send({}).status(400);
    }
  },
};
