var express 	= require('express'),
  	services    = express.Router(),
	userStory 	= require("./userStory.js");

services.get('/invoiceNumbers', function(req, res) {
	userStory.parseInvoiceNumbers(function(parseInvoiceNumbers) {
		console.log("Parsing invoice number response is : " + JSON.stringify(parseInvoiceNumbers));
		res.send(parseInvoiceNumbers);
	})
})

module.exports = services;