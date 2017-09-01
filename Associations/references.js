var mongoose = require("mongoose");

// outside promise library used, default is deprecated
mongoose.Promise = require("bluebird");

// mongoose connection string
mongoose.connect("mongodb://localhost/blog_demo_2",{
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
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
});

// user model from userSchema above
var User = mongoose.model("User",userSchema);

// User.create({
//     name: "bob",
//     email: "bob@email.com"
// },(err,user)=>{
//     console.log(user);
// });     

// create the post
// find user and assign post to user

// Post.create({
//     title: "How to do something pt 1",
//     content: "blah blah blah blah blah"
// },(err,data)=>{
//     User.findOne({email: "bob@email.com"},(err,foundUser)=>{
//         if(err)
//             console.log(err);
//         else
//             {
//                 foundUser.posts.push(data);
//                 foundUser.save((err,post)=>{
//                     if(err)
//                         console.log(err);
//                     else
//                         console.log(post);
//                 });
//             }
//     });
// });

User.findOne({email: "bob@email.com"}).populate("posts").exec((err,userDetail)=>{
    if(err)
        console.log(err);
    else
        console.log(userDetail);
});