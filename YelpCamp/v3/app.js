var express 	= require("express");
var app 		= express();
var bodyParser 	= require("body-parser");
var mongoose 	= require("mongoose");
var Campground 	= require("./models/campground"); 
var seedDB		= require("./seeds.js");

seedDB();

// add mongoose connection string
mongoose.connect("mongodb://localhost/yelp_camp",{
	useMongoClient: true
});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

app.get("/",(req,res) => {
	res.redirect("/campgrounds");
});

app.get("/campgrounds",(req,res)=>{
	Campground.find({},(err,allCampground)=>{
		if(err)
			console.log(err);
		else
			res.render("campgrounds",{campgrounds: allCampground});
	});
});

app.get("/campgrounds/new", (req,res) => {
	res.render("new"); 
});

app.post("/campgrounds", (req,res)=>{
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var newCampground = {name: name, image: image, description: description};
	Campground.create(newCampground,(err,newlyCampground)=>{
		if(err)
			console.log(err);
		else
			res.redirect("/campgrounds");
	});
});

// SHOW CAMPGROUND
app.get("/campgrounds/:id", (req,res)=>{
	Campground.findById(req.params.id).populate("comments").exec((err,foundCampground)=>{
		if(err)
			console.log(err);
		else{
			console.log(foundCampground);
			res.render("show",{campground : foundCampground});
		}
	});
});

app.listen(3000,(req,res)=>{
	console.log("The YelpCamp server has started");
});