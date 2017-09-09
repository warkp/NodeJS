var express 	= require('express'),
  	services    = express.Router(),
	marcoPolo 	= require("./marcoPolo.js");

	services.get('/marcoPoloGame', function(req, res) {
		marcoPolo.getMarcoPoloResult(function(getMarcoPoloResponse) {
			console.log("Marcopolo game response is : " + JSON.stringify(getMarcoPoloResponse));
			res.send(getMarcoPoloResponse);
		})
	})

module.exports = services;