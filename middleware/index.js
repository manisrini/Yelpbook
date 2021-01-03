var Book 	= require("../models/book"),
	Comment = require("../models/comment")

var middlewareObj ={};


middlewareObj.checkBookOwnership = function(req,res,next){
	if(req.isAuthenticated()){
		Book.findById(req.params.id,function(err,foundBook){
			if(err){
				res.redirect("back");
			}
			else{
				if(foundBook.author.id.equals(req.user._id)){
				next();
				}
				else{
				res.redirect("back");	
				}
			
			}
		})	
	}
	else{
		res.redirect("back");

	}
}

middlewareObj.checkCommentOwnership = function(req,res,next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id,function(err,foundComment){
			if(err){
				console.log(err);
			}else{
				if(req.user._id.equals(foundComment.author.id)){
					next();
				}else{
					res.redirect("back")
				}
			}
		})
	}
	else{
		
		res.redirect("/login");
	}
}

middlewareObj.isLoggedin = function(req ,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","Please Login or signup first !!!")
	res.redirect("/login")
}

module.exports = middlewareObj;