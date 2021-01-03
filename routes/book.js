var express = require("express");
var router= express.Router();
var Book = require("../models/book");
var middleware = require("../middleware/index")

router.get("/books",function(req,res){
	
	Book.find({},function(err,allBooks){
		if(err)
		{
			console.log(err);
		}else{
			
			res.render("books/index",{books : allBooks});
		}
	})
	
	
})

//post route for new book
router.post("/books",middleware.isLoggedin,function(req,res){
	
	var name = req.body.name
	var image = req.body.image
	var desc = req.body.desc
	var price = req.body.price
	var genre = req.body.genre
	var author = {
		id : req.user._id,
		username  :req.user.username
	}
	
	var newBook = {name : name , image:image ,description:desc , author:author , price:price , genre:genre}
	Book.create(newBook,function(err,addedBook){
		if(err){
			console.log(err);
		}else{
			req.flash("success","New book added successfully!!!");
			res.redirect("/books")
		}
	})
	
})

//add new books
router.get("/books/new",middleware.isLoggedin,function(req,res){
	res.render("books/new")
})

//showing more info
router.get("/books/:id",function(req,res){
	Book.findById(req.params.id).populate("comments").exec(function(err,foundBook){
		if(err){
			console.log(err)
		}else{
			
			res.render("books/show",{foundBook : foundBook});
		}
	})
})
//edit
router.get("/books/:id/edit",middleware.checkBookOwnership,function(req,res){
	Book.findById(req.params.id,function(err,foundBook){
		if(err){
			console.log(err);
		}
		else{
			res.render("books/edit",{book : foundBook})	
		}
	})
})
//update
router.put("/books/:id",middleware.checkBookOwnership,function(req,res){
	Book.findByIdAndUpdate(req.params.id,req.body.book,{new:true},function(err,updatedBook){
		if(err){
			console.log(err);
		}
		else{
			req.flash("success","Info updated successfully!!!");
			res.redirect("/books/" + req.params.id);
		}
	})
})

//delete
router.delete("/books/:id",middleware.checkBookOwnership,function(req,res){
	Book.findByIdAndRemove(req.params.id,function(err,deletedBook){
		if(err){
			console.log(err);
		}else{
			req.flash("error","Book deleted");
			res.redirect("/books");
		}
	})
	
})
//middleware



module.exports = router;
