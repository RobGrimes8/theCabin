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

app.get("/ourCF", function(req, res){
	res.render("ourCF");
});

app.get("/gallery", function(req, res){
	
	var allPhotos = [ {
		image: "https://cdn.shopify.com/s/files/1/2395/7099/products/776090ea-9b4e-40c6-89c7-26d90397e503_900x.progressive.jpg?v=1589752683",
		text: "what a lovely day today!!"
	},
	{
		image: "https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/270/270202/cups-of-coffee.jpg?w=1155&h=1541",
		text: "todays cup of coffee!"
	},
	{
		image: "https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/04/09/20/istock-157528129.jpg?w968h681",
		text: "food was brilliant"
	},
	{
		image: "https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/270/270202/cups-of-coffee.jpg?w=1155&h=1541",
		text: "todays cup of coffee!"
	}
];
	
	res.render("gallery", {photos: allPhotos});
});

app.post("/about", validateEmail, function(req, res){
	
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
		api_key: 'process.env.MAILGUN_AUTH_API_KEY',
		domain: 'process.env.MAILGUN_DOMAIN'
	  }
	}

	var nodemailerMailgun = nodemailer.createTransport(mg(auth));

	nodemailerMailgun.sendMail({
	  from: req.body.message.email,
	  to: 'process.env.MY_EMAIL', // An array if you have multiple recipients.
	  subject: req.body.message.subject,
	  text: req.body.message.content,
	}, function (err, info) {
	  if (err) {
		console.log('Error: ' + err);
	  }
	  else {
		res.render("landing");
	  }
	});
	
});

function validateEmail(req, res, next){

  const email = req.body.message.email;

  if (validateEmail(email)) {
    next();
  } else {
	res.render("about");
  }
  return false;
};

function validateEmailer(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}


app.listen(process.env.PORT || 3000, function(){
});