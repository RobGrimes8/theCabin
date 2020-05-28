var express 				= require("express"), 
	app 	 				= express(), 
	bodyParser				= require("body-parser"), 
	mongoose 				= require("mongoose"),
	flash					= require("connect-flash"),
	passport				= require("passport"),
	LocalStrategy 			= require("passport-local"),
	methodOverride			= require("method-override"),
	passportLocalMongoose 	= require("passport-local-mongoose"),
	nodemailer 				= require("nodemailer"),
	mg = require('nodemailer-mailgun-transport');
	// Message 		= require("./models/message");

// mongoose.connect("mongodb://localhost:27017/hummingbird", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
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

app.post("/about", function(req, res){
	
//========= Message page method. ============//
	
// //Get data from form and push to campgrounds array
// 	var newMessage = req.body.message;
// 	//create new campground and save to database
// 	Message.create(newMessage, function(err, message){
//  		if(err){
//  			console.log(err);
//  			console.log("Error occured.")
//  		}else{
// 			console.log(message);
//  			res.redirect("/");
//  		}
//  	});
	
//========= Email sender method. ============//	
	// This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
	var auth = {
	  auth: {
		api_key: 'e2aeeef39623a26de1bdaa362124b2b5-7fba8a4e-37cff87b',
		domain: 'sandbox9c133f797e2d43539301482c178e53b7.mailgun.org'
	  }
	}

	var nodemailerMailgun = nodemailer.createTransport(mg(auth));

	nodemailerMailgun.sendMail({
	  from: req.body.email,
	  to: 'grimesrob8@gmail.com', // An array if you have multiple recipients.
	  subject: req.body.subject,
	  text: req.body.message,
	}, function (err, info) {
	  if (err) {
		console.log('Error: ' + err);
	  }
	  else {
		res.render("landing");
	  }
	});
	
});

app.listen(process.env.PORT || 3000);