var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var localStrategy = require("passport-local");
var flash = require("connect-flash");
var passportLocalMongoose = require("passport-local-mongoose");
var methodOverride = require("method-override");

var Book =require("./models/book.js");
var Comment = require("./models/comment")
var User = require("./models/user")
var seedDB = require("./seed.js");


var commentRoutes = require("./routes/comment"),
	bookRoutes    = require("./routes/book"),
	authRoutes 	  = require("./routes/index");

// seedDB();
app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"))
app.use(methodOverride("_method"))


mongoose.connect(process.env.DBURL,{
	useNewUrlParser: true,
  	useUnifiedTopology: true
})
.then(() => {
	console.log("Connected to yelpbook db");
})
.catch(error => {
	console.log(error);
})

app.use(flash());
//passport config
app.use(require("express-session")({
	secret : "I love my parents",
	resave : false,
	saveUninitialized : false
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//middleware to send user to all page
app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.success = req.flash("success");
	res.locals.error = req.flash("error");
	next();
})
app.use("/books/:id/comments",commentRoutes);
app.use(authRoutes);
app.use(bookRoutes);

app.get("/",function(req,res){
	res.render("landing")
})

app.listen(process.env.PORT || 3000 , process.env.IP , function(){
	console.log("Server started!!!!")
})