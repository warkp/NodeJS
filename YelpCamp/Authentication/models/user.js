var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

// includes various features that are required for user authentication
// comes with passport-local-mongoose package
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);