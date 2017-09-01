var mongoose    = require("mongoose");
var Campground  = require("./models/campground");
var Comment     = require("./models/comment");

var data = [
    {
        name        : "abc",
        image       : "https://images.pexels.com/photos/45241/tent-camp-night-star-45241.jpeg?h=350&auto=compress&cs=tinysrgb",
        description : "blah blah blah"   
    },
    {
        name        : "def",
        image       : "https://images.pexels.com/photos/45241/tent-camp-night-star-45241.jpeg?h=350&auto=compress&cs=tinysrgb",
        description : "blah blah blah"
    }
];

function seedDB(){
    Campground.remove({},(err)=>{
        if(err){
            console.log(err);
        }
        data.forEach(function(seed){
            Campground.create(seed,(err,newCamp)=>{
                if(err)
                    console.log(err);
                else{
                    console.log("Campground created");
                    // create comment
                    Comment.create({
                        text: "this is a sample comment to be added to campground",
                        author: "Random User" 
                    },function(err, comment){
                        if(err)
                            console.log(err);
                        else{
                            newCamp.comments.push(comment);
                            newCamp.save();
                            console.log("Campground comment added");
                        }
                    });
                }
            });
        });
    });
}
module.exports = seedDB; 