var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

var campgrounds = [
	{name: "YOLO",image:"https://images.pexels.com/photos/45241/tent-camp-night-star-45241.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb"},
	{name: "BOLO",image:"https://images.pexels.com/photos/116104/pexels-photo-116104.jpeg?h=350&auto=compress&cs=tinysrgb"},
	{name: "POLO",image:"https://images.pexels.com/photos/93858/pexels-photo-93858.jpeg?h=350&auto=compress&cs=tinysrgb"}
];

app.get("/",(req,res) => {
	res.render("landing");
});

app.get("/campground",(req,res)=>{

	res.render("campground",{campgrounds: campgrounds});
});

app.get("/campground/new", (req,res) => {
	res.render("new"); 
});

app.post("/campground", (req,res)=>{
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image};
	campgrounds.push(newCampground);
	res.redirect("/campground");
});

app.listen(3000,(req,res)=>{
	console.log("The YelpCamp server has started");
});