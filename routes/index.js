var express = require("express");
var router= express.Router();
var User = require("../models/user");
var passport = require("passport")
//routes


//AUTH REGISTER
router.get("/register",function(req,res){
	res.render("user/register");
})

router.post("/register",function(req,res){
	var newUser = new User({username : req.body.username});
	User.register(newUser , req.body.password , function(err,addUser){
		if(err){
			console.log(err);
			return res.render("user/register")
		}
		passport.authenticate("local")(req,res,function(){
			res.redirect("/books");	
		})
	})
})

//AUTH LOGIN
router.get("/login",function(req,res){
	res.render("user/login.ejs");
})

router.post("/login",passport.authenticate("local"),function(req,res){
	req.flash("success","Welcome to Yelpbook " + req.user.username + "!!!");
	res.redirect("/books");
	
})

//AUTH LOGOUT
router.get("/logout",function(req,res){
	req.logout();
	req.flash("success","See you later!!!");
	res.redirect("/books");
})



module.exports = router;