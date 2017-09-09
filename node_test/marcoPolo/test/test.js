var assert  = require('assert');
  chai      = require('chai'),
	fs        = require("fs"),
	server    = require("../server.js"),
	chaiHttp  = require('chai-http');

chai.use(chaiHttp);

// Test cases for parseInvoiceNumbers
describe('/GET marcoPoloGame', ()=> {
  it('successfully getting the result', (done)=> {
    chai.request(server).get('/marcoPoloGame').end((err, res)=> {
      assert.equal(res.body.success, true);
      done();
    });
  });

  it('hitting the api 5 users parallely ', (done)=> {
    chai.request(server).get('/marcoPoloGame').end((err, res)=> {
    });
    chai.request(server).get('/marcoPoloGame').end((err, res)=> {
    });
    chai.request(server).get('/marcoPoloGame').end((err, res)=> {
    });
    chai.request(server).get('/marcoPoloGame').end((err, res)=> {
    });
    chai.request(server).get('/marcoPoloGame').end((err, res)=> {
    });
    done();
  });
})