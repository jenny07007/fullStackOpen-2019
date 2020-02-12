const config = require("./utils/config");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const blogRouter = require("./routers/blogsRouter");
const app = express();

const url = config.MONGODB_URI;
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("connected to MongoDB"))
  .catch(err => console.log("error connecting to MongoDB", err.message));

app.use(cors());
app.use(bodyParser.json());

morgan.token("body", req => JSON.stringify(req.body));
const loggerFormat =
  ":method :url :status :res[content-length] - :response-time ms - :body";

app.use(
  morgan(loggerFormat, {
    skip: function(req) {
      return req.method !== "POST";
    }
  })
);

app.use(
  morgan("combined", {
    skip: function(req) {
      return req.method === "POST";
    }
  })
);

app.use("/api/blogs", blogRouter);
module.exports = app;
