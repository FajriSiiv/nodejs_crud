const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./modals/blog");
const { render } = require("express/lib/response");
require("dotenv").config();
// express app
const app = express();

// connect to MongoDB
const dbURL = process.env.API_KEY;
mongoose
  .connect(dbURL)
  .then((res) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// listen request

// middleware static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.redirect("blogs");
});

app.get("/about", (req, res) => {
  //   res.send(`<p>About Page</p>`);
  res.render("about", { title: "About Page" });
});

// blog routes
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => console.log(err));
});

app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => console.log(err));
});

app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => console.log(err));
});

app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => console.log(err));
});

app.get("/blog/create", (req, res) => {
  res.render("create", { title: "Create a new Blog" });
});

// 404 pages
app.use((req, res) => {
  res.status(404).render("404");
});
