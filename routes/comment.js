var express = require("express");
var router= express.Router({mergeParams : true});
var Book =require("../models/book");
var Comment = require("../models/comment")
var middleware = require("../middleware/index")
//new comment
router.get("/new",middleware.isLoggedin,function(req,res){
	Book.findById(req.params.id,function(err,foundBook){
		if(err){
			console.log(err);
		}else{
			console.log(foundBook);
			res.render("comments/new",{book : foundBook})		
		}
	})
	
})

//comment info
router.post("/",middleware.isLoggedin,function(req,res){
	var newComment = req.body.comment;
	
	Book.findById(req.params.id,function(err,foundBook){
		if(err){
			console.log(err);
		}else{
			Comment.create(newComment,function(err,addedComment){
				addedComment.author.id = req.user._id;
				addedComment.author.username = req.user.username;
				addedComment.save();
				
				foundBook.comments.push(addedComment);
				foundBook.save();
				req.flash("success","Comment added");
				res.redirect("/books/"+req.params.id);	
			})
			
		}
	})
	
	
})
//edit
router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
	Comment.findById(req.params.comment_id,function(err,foundComment){
		if(err){
			console.log(err);
			res.redirect("/books");
		}else{
			res.render("comments/edit",{book_id : req.params.id,comment : foundComment});
		}
	})
})
//update
router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
	var comm = req.body.comment;
	console.log(comm);
	Comment.findByIdAndUpdate(req.params.comment_id,comm,function(err,updatedComment){
		if(err){
			console.log(err);
			res.redirect("/books");
		}else{
		req.flash("success","Info updated successfully!!!");
		res.redirect("/books/" + req.params.id);	
		}
	})
})

//delete
router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id,function(err,delBook){
		if(err){
			console.log(err);
			res.redirect("/books");
		}else{
			req.flash("error","Comment in scum");
			res.redirect("/books/" + req.params.id);
		}
	})
})



module.exports = router;