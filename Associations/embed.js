var mongoose = require("mongoose");

// outside promise library used, default is deprecated
mongoose.Promise = require("bluebird");

// mongoose connection string
mongoose.connect("mongodb://localhost/blog_demo",{
    useMongoClient: true
});

// post schema - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

// post model from schema above
var Post = mongoose.model("Post",postSchema);

// user schema - name, email
var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    posts: [postSchema]
});

// user model from userSchema above
var User = mongoose.model("User",userSchema);

// create new user
var newUser = new User({
    name: "Himanshu Kandpal",
    email: "himanshu@himanshukandpal.edu"
});

// push data into user
newUser.posts.push({
    title: "Topic 1",
    content: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur"
});

// save data into schema
newUser.save((err,user)=>{
    if(err)
        console.log(err);
    else
        console.log(user);
});