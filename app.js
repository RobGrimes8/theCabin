var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    flash = require("connect-flash"),
    methodOverride = require("method-override"),
    mailgun = require('mailgun-js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/about", function(req, res) {
    res.render("about");
});

app.get("/ourCF", function(req, res) {
    res.render("ourCF");
});

app.get("/gallery", function(req, res) {

    var allPhotos = [{
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

    res.render("gallery", { photos: allPhotos });
});

app.post("/about", validateEmail, function(req, res) {

    //========= Email sender method. ============//	
    // This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
    const api_key = process.env.API_KEY;
    const DOMAIN = process.env.MAILGUN_DOMAIN;
    const mg = mailgun({ apiKey: api_key, domain: DOMAIN });
    const data = {
        from: req.body.name + ' <' + req.body.email + '>',
        to: process.env.RECIPIENT_EMAIL,
        subject: "I'm interested in a " + req.body.interest,
        text: req.body.message
    };
    mg.messages().send(data, function(error, body) {
        console.log(body);
    });
    req.flash("info", "Message sent! I will be back in touch as soon as possible.")
    res.redirect('/');

});

function validateEmail(req, res, next) {

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


app.listen(process.env.PORT || 3000, function() {
    console.log("Server is up and running boss")
});