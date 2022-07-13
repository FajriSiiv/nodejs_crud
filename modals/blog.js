const mongoose = require("mongoose");
const schema = mongoose.Schema;

const blogShcema = new schema(
  {
    title: {
      type: String,
      require: true,
    },
    snippet: {
      type: String,
      require: true,
    },
    body: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogShcema);

module.exports = Blog;
