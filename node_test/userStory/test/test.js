var assert  = require('assert');
  chai      = require('chai'),
	fs        = require("fs"),
	server    = require("../server.js"),
	chaiHttp  = require('chai-http');

chai.use(chaiHttp);

// Test cases for parseInvoiceNumbers
describe('/GET invoiceNumbers', ()=> {
  it('successfully write the result in file', (done)=>{
    chai.request(server).get('/invoiceNumbers').end((err, res)=> {
      assert.equal(res.body.success, true);
      done();
    });
  });
 
 setTimeout(function(){
	 it('write the correct output to file', (done)=> {
	    chai.request(server).get('/invoiceNumbers').end((err, res)=> {
	    	var currentDir = __dirname;
	    	currentDir = currentDir.substring(0,currentDir.lastIndexOf("/"));
	      fs.readFile(currentDir+'/output_user_story_1.txt', 'utf8', (err,data)=> {
				  if (err) {
				    return console.log(err);
				  }
				  var result = data.split("\n");
				  assert.equal(result[0], "600143155");
				  assert.equal(result[1], "650408454");
	      	done();
				})
	    });
	  });
 })	
});