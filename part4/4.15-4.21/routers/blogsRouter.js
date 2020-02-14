const blogsRouter = require("express").Router();
const Blog = require("../models/Blog");
const User = require("../models/User");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.post("/", async (req, res) => {
  const { title, author, url, likes, userId } = req.body;

  const user = await User.findById(userId);
  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    user: user._id
  });

  try {
    const newBlog = await blog.save();
    user.blogs = user.blogs.concat(newBlog._id);
    await user.save();
    res.json(newBlog.toJSON());
  } catch (error) {
    res.status(201).json();
  }
});

module.exports = blogsRouter;
