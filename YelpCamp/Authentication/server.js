var express                 = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    User                    = require("./models/user"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose");

// connection string
mongoose.connect("mongodb://localhost/auth_demo_app",{
    useMongoClient: true
});

var server = express();
server.set("view engine","ejs");

server.use(require("express-session")({
    secret: "This is going to be awesome thing in the world",
    resave: false,
    saveUninitialized: false
}));

// required following two server.use whenever used passport library
server.use(passport.initialize());
server.use(passport.session());

// encoding data, serializing it and putting it back in session
passport.serializeUser(User.serializeUser());
// reading session, taking data from session and decoding it
passport.deserializeUser(User.deserializeUser());

// ROUTES

server.get("/",(req,res)=>{
    res.render("home");
});

server.get("/secret",(req,res)=>{
    res.render("secret");
});

// AUTH ROUTES



server.listen(3000,(req,res)=>{
    console.log("Server has started....")
});