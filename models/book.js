var mongoose = require("mongoose");

//Schema for yelpbook
var bookSchema = new mongoose.Schema({
	name : String,
	image : String,
	description : String,
	comments : [
		{
			type : mongoose.Schema.Types.ObjectId,
			ref  : "Comment"
		}
	],
	author : 
	{
		id : {
			type : mongoose.Schema.Types.ObjectId,
			ref : "User"
			},
		username : String
	}
})

//creating model

module.exports = mongoose.model("Book",bookSchema);
