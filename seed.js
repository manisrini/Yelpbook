var mongoose = require("mongoose");
var Book = require("./models/book");
var Comment = require("./models/comment");

var data =  [
	{
		name : "Harry Potter",
		image : "https://images.unsplash.com/photo-1542823871-47592fe5d3b1?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8aGFycnklMjBwb3R0ZXIlMjBib29rfGVufDB8fDB8&auto=format&fit=crop&w=500&q=60",
		description : "This is an awesome book"
	},
	{
		name : "WIll of fire",
		image : "https://images.unsplash.com/photo-1529158062015-cad636e205a0?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=391&q=80",
		description : "siudgh srgfbvhsoig"
	},
	{
		name : "Secret",
		image : "https://images.unsplash.com/photo-1517770413964-df8ca61194a6?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80",
		description : "Wonderful book"
	}
]
function seedDB(){
	Book.deleteMany({},function(err,removedBook){
	if(err){
		console.log(err);
	}
	console.log("removed campgrounds");
	Comment.deleteMany({},function(err,removedComment){
		if(err){
			console.log(err);
		}
	console.log("commentremoved");
	// data.forEach(function(newBook){
	// Book.create(newBook,function(err,addedBook){
	// 	if(err){
	// 			console.log(err);
	// 		}else{
	// 			console.log("added a book");
	// 			Comment.create({
	// 				text : "nice book",
	// 				author : "mani"
	// 			},function(err,newComment){
	// 				if(err){
	// 					console.log(err);
	// 				}else{
	// 					addedBook.comments.push(newComment);
	// 					addedBook.save();
	// 					console.log("new comment addede");
	// 				}
	// 			})
	// 		}	
	// 	})
	// })	
		
	})
		
		
	
})

}

module.exports = seedDB;