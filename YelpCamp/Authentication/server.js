var express                 = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    User                    = require("./models/user"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose");

// promise library 
mongoose.Promise = require("bluebird");
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
server.use(bodyParser.urlencoded({extended:true}));
// required following two server.use whenever used passport library
server.use(passport.initialize());
server.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
// encoding data, serializing it and putting it back in session
passport.serializeUser(User.serializeUser());
// reading session, taking data from session and decoding it
passport.deserializeUser(User.deserializeUser());

// ROUTES

server.get("/",(req,res)=>{
    res.render("home");
});

server.get("/secret", isLoggedIn, (req,res)=>{
    res.render("secret");
});

// AUTH ROUTES
server.get("/register",(req,res)=>{
    res.render("register");
});

server.post("/register",function(req,res){
    User.register(new User({username: req.body.username}), req.body.password, function(err,user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/secret");
        });
    }); 
});

// login routes
server.get("/login",(req,res)=>{
    res.render("login");
});

server.post("/login", passport.authenticate("local",{
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req,res){
});


server.get("/logout",function(req,res){
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

server.listen(3000,(req,res)=>{
    console.log("Server has started....")
});