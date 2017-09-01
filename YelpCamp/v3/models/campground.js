var mongoose = require("mongoose");

// create campground schema
// yelpcamp schema definition
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

// module export
module.exports = mongoose.model("Camground",campgroundSchema);