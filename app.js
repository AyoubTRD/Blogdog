var express = require("express")
var mongoose = require("mongoose")
var bodyParser = require("body-parser")

var app = express()

app.use(bodyParser.urlencoded([extended = true]))
mongoose.connect("mongodb://localhost:27017/blogdog", {useNewUrlParser: true})
app.use(express.static("public"))
app.set("view engine", "ejs")

var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  content: String,
  date: {type: Date, default: Date.now}
})

var Blog = new mongoose.model("Blog", blogSchema)


app.get("/", function(req, res){
  res.redirect("/blogs")
})

app.get("/blogs", function(req, res){
  Blog.find({}, function(err, blogs){
    if(err){
      console.log(err)
    }
    else {
      res.render("blogs", {blogs: blogs})
    }
  })
})

app.get("/createblog", function(req, res){
  res.render("createblog")
})

app.post("/blogs", function(req, res){
  Blog.create({
    title: req.body.title,
    image: req.body.image,
    content: req.body.content
  }, function(err, createdBlog){
    if(err){
      console.log(err),
      res.send("Something went wrong! Try Again")
    } else{
      console.log("New Blog Created!")
      console.log(createdBlog)
    }
  })
  res.redirect("/blogs")
})
app.get("/blogs/:id", function(req, res){
  Blog.findById(req.params.id, function(err, foundBlog){
    if(err){
      console.log(err)
    }else {
      res.render("showblog", {blog: foundBlog})
    }
  })
})
app.listen(5000, function(){
  console.log("BlogDog Server Has Started!")
})