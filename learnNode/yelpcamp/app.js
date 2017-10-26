var express = require("express");
var app = express();

app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("landing");
});

app.get("/campgrounds",function(req,res){
    var campgrounds = [
        {name: "Salmon creek", image: "https://farm7.staticflickr.com/6082/6142484013_74e3f473b9.jpg"},
        {name: "Granite Hill", image: "https://farm6.staticflickr.com/5694/21041875770_ffea6404d0.jpg"},
        {name: "Mountain Gout", image: "https://farm9.staticflickr.com/8294/7777868526_882af8ae41.jpg"}
    ]

    res.render("campgrounds",{campgrounds: campgrounds});
});

app.listen(3000, function(){
    console.log("The yelpcamp server has started");
});