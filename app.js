var express 				= require("express"), 
	app 	 				= express(), 
	bodyParser				= require("body-parser"), 
	mongoose 				= require("mongoose"),
	flash					= require("connect-flash"),
	passport				= require("passport"),
	LocalStrategy 			= require("passport-local"),
	methodOverride			= require("method-override"),
	passportLocalMongoose 	= require("passport-local-mongoose");

//mongoose.connect("mongodb://localhost:27017/hummingbird", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/about", function(req, res){
	res.render("about");
});

app.listen(process.env.PORT || 3000);