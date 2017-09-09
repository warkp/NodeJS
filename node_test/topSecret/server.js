var express = require('express'),
  server       = express(),
  cors      = require('cors'),
  path      = require('path'),
  bodyParser= require("body-parser"),
  routes    = require("./routes/index");

  server.use(cors());
  server.use('./static', express.static(path.join(__dirname, 'views')))

  server.use(bodyParser.urlencoded({
    extended: true
 	})); 
 	
 	server.use(bodyParser.json());
  
  server.use("/",routes); // Set default route to route folder
  module.exports = server;
  
  server.listen(3000, function () {
		console.log('Server is running on port 3000')
	})


