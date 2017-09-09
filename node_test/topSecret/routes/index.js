var express 	= require('express'),
  	services    = express.Router(),
	userStory 	= require("./userStory.js");

services.get('/topSecret', function(req, res) {
	userStory.getTopSecret(function(getTopSecretResponse) {
		console.log("Top Secret response is : " + JSON.stringify(getTopSecretResponse));
		res.send(getTopSecretResponse);
	})
})

module.exports = services;