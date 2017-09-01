var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// add mongoose connection string
mongoose.connect("mongodb://localhost/yelp_camp",{
	useMongoClient: true
});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");


// yelpcamp schema definition
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

// create model from schema definition
var Campground = mongoose.model("Camground",campgroundSchema);

// Campground.create({
// 	name: "Granite Hill",
// 	image:"https://images.pexels.com/photos/45241/tent-camp-night-star-45241.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb"
// }, (err,camground)=>{
// 	if(err)
// 		console.log(err);
// 	else
// 		console.log("Newly created camground");
// });

// var campgrounds = [
// 	{name: "Cloud Nest",image:"https://images.pexels.com/photos/116104/pexels-photo-116104.jpeg?h=350&auto=compress&cs=tinysrgb"},
// 	{name: "Lodhi Park",image:"https://images.pexels.com/photos/93858/pexels-photo-93858.jpeg?h=350&auto=compress&cs=tinysrgb"}
// ];

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

app.get("/campgrounds/:id", (req,res)=>{
	Campground.findById(req.params.id, (err,foundCampground)=>{
		if(err)
			console.log(err);
		else
			res.render("show",{campground : foundCampground});
	});
});

app.listen(3000,(req,res)=>{
	console.log("The YelpCamp server has started");
});