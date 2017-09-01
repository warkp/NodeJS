var bodyparser = require("body-parser"),
    mongoose   = require("mongoose"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    express    = require("express"),
    server     = express();

// connect mongoose to database mongodb
mongoose.connect("mongodb://localhost/restful_blog_app",{
    useMongoClient: true
});

server.set("view engine","ejs");
server.use(express.static("public"));
server.use(bodyparser.urlencoded({extended:true}));
server.use(methodOverride('_method'));
server.use(expressSanitizer());

// Schema declaration
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

// method declaration
var Blog = mongoose.model("Blog",blogSchema);

// Blog.create({
//     title: "Title BLog",
//     image: "https://unsplash.com/?photo=pTgMXg2WrHY",
//     body: "EXAMPLE TEXT TO BE USED IN THE BLOG IS TO BE INSERTED HERE ONLY"
// },(err,res)=>{
//     if(err)
//         console.log(err);
//     else
//         console.log("DATA INSERTED SUCCESSFULLY");
// });


// blog route
server.get("/",(req,res)=>{
    res.redirect("/blogs");
});

// index route
server.get("/blogs",(req,res)=>{
    Blog.find({},(err,blogs)=>{
        if(err)
            console.log(err);
        else
            res.render("index",{blogs:blogs});
    });
});

// new route
server.get("/blogs/new",(req,res)=>{
    res.render("new");
});

// create route
server.post("/blogs",(req,res)=>{
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog,(err,newBlog)=>{
        if(err)
            res.render("new");
        else
            res.redirect("/blogs");
    });
});

// show route
server.get("/blogs/:id",(req,res)=>{
    Blog.findById(req.params.id,(err,foundID)=>{
        if(err)
            res.redirect("/blogs");
        else
            res.render("show",{blog:foundID});
    });
});

// edit route
server.get("/blogs/:id/edit",(req,res)=>{
    Blog.findById(req.params.id,(err,foundID)=>{
        if(err)
            res.redirect("/blogs");
        else
            res.render("edit",{blog: foundID});
    })
});

// update route
server.put("/blogs/:id",(req,res)=>{
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog , (err,updatedBlog)=>{
        if(err)
            res.redirect("/blogs");
        else
            res.redirect("/blogs/" + req.params.id);
    });
});

// delete route
server.delete("/blogs/:id",(req,res)=>{
    Blog.findByIdAndRemove(req.params.id,(err,deleteBlog)=>{
        if(err)
            res.redirect("/blogs");
        else
            res.redirect("/blogs");
    });
});

server.listen(3000,()=>{
    console.log("RESTful SERVER IS RUNNING");
});