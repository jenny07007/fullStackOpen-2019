const blogsRouter = require("express").Router();
const Blog = require("../models/Blog");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  return !blogs.length
    ? res.json("<p>Hi there</p>")
    : res.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.post("/", async (req, res) => {
  const { title, author, url, likes } = req.body;
  try {
    const blog = new Blog({ title, author, url, likes });
    const newBlog = await blog.save();
    res.json(newBlog.toJSON());
  } catch (error) {
    res.status(201).json();
  }
});

module.exports = blogsRouter;
