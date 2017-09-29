var express = require("express"),
    User    = require("../routes/user"),
    router  = express.Router();

// get register page
router.get('/',function(req,res,next){
    res.render('register',{title: 'Sign Up'});
});

router.post('/',function(req,res,next){
    User.register(new User({username: req.body.username}),req.body.password,function(err,result){
        if(err){
            console.log("Registration Not working actually");
            return res.render('/');
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/secret");
        });
    })
});

module.exports=router;