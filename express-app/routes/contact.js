var express     = require('express'),
    nodemailer  = require("nodemailer");
    
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

router.post('/post', function(req,res,next){
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'codegrat@gmail.com',
      pass: '!@$dpjpk9462k#'
    }
  });

  var mailOptions = {
    from: "Bradly Cooper <codegrat@gmail.com>",
    to: 'himanshukp324@gmail.com',
    subject: 'You have a new message from ' +req.body.name,
    text: 'You have a new message from ' +req.body.name+ ' with email address ' +req.body.email+ ' . Message: ' +req.body.message,
    html: '<p>You have a new message from <ul> <li>Name:' +req.body.name+ '</li> <li>Email: '+req.body.email+'</li> <li>Message: '+req.body.message+'</li> </ul></p>'
   }

   transporter.sendMail(mailOptions,(err,info)=>{
    if(err){
      console.log(err);
      res.redirect('/');
    } else {
      console.log('Message sent: '+info.response);
      res.redirect('/');
    }
   });

});

module.exports = router;
