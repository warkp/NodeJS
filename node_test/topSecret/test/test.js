var assert  = require('assert');
  chai      = require('chai'),
	fs        = require("fs"),
	server    = require("../server.js"),
	chaiHttp  = require('chai-http');

chai.use(chaiHttp);


//  Test cases for  getTopSecret api

describe('/GET getTopSecret', ()=> {
  it('successfully write the result in file', (done)=> {
    chai.request(server).get('/getTopSecret').end((err, res)=> {
      assert.equal(res.body.success, true);
      done();
    });
  });
 
 setTimeout(()=>{
	 it('write the correct output to file', (done)=> {
	    chai.request(server).get('/getTopSecret').end((err, res)=> {
	    	var currentDir = __dirname;
	    	currentDir = currentDir.substring(0,currentDir.lastIndexOf("/"));
	      fs.readFile(currentDir+'/output_top_secret_1.txt', 'utf8', (err,data)=> {
				  if (err) {
				    return console.log(err);
				  }
				  var result = data.split("\n");
				  assert.equal(result[0], "600143155");
				  assert.equal(result[1], "6504?8454 ILLEGAL");
				  assert.equal(result[2], "38?057021 ILLEGAL");
	      	done();
				})
	    });
	  });
	 	
 })	

});