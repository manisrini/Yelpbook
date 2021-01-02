var mongoose = require("mongoose");

//schema creation
var commentSchema = new mongoose.Schema({
	text : String,
	rating : Number,
	author : {
		id : {
			type  : mongoose.Schema.Types.ObjectId,
			ref : "User"
		},
		username : String
		
	}
})

//model creation
module.exports= mongoose.model("Comment",commentSchema);