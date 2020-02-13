const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/User");

usersRouter.post("/", async (req, res, next) => {
  try {
    const { name, username, password } = req.body;
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      name,
      hashedPassword
    });

    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
