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

app.get("/gallery", function(req, res) {

    var allPhotos = [{
            image: "https://scontent-lhr8-1.xx.fbcdn.net/v/t1.0-9/s1080x2048/103364015_950228958765182_5072206665611311081_o.jpg?_nc_cat=111&_nc_sid=9267fe&_nc_ohc=X8qP2TSbGO8AX_AKO6S&_nc_ht=scontent-lhr8-1.xx&_nc_tp=7&oh=306189f1848259a30455f7b150b462c0&oe=5F117D7A",
            title: "Birthday cards!",
            desc: "Birthday coming up? Best friend got a new job? We have cards from Choo Choo at our counter for you to have a look at. £2.50 each!✨",
            photoId: "1"
        },
        {
            image: "https://scontent-lhr8-1.xx.fbcdn.net/v/t1.0-9/s1080x2048/104459363_950105438777534_7362702774212807111_o.jpg?_nc_cat=107&_nc_sid=9267fe&_nc_ohc=mT5pQv5OESkAX9GC453&_nc_ht=scontent-lhr8-1.xx&_nc_tp=7&oh=1b23764b028b2f1a720db6a0d8f6ca23&oe=5F0F60B4",
            title: "Syrups!",
            desc: "New syrups have arrived! Some sugar free too, come and give them a try!",
            photoId: "2"
        },
        {
            image: "https://scontent-lhr8-1.xx.fbcdn.net/v/t1.0-9/s1080x2048/101791813_945915785863166_6621990462267366921_o.jpg?_nc_cat=110&_nc_sid=9267fe&_nc_ohc=2QPt8irOxkYAX9XINV_&_nc_ht=scontent-lhr8-1.xx&_nc_tp=7&oh=45d5ab8a97293bf46f7cfccc3c67f023&oe=5F0F2761",
            title: "Food was brilliant",
            desc: "Another gorgeous day in Ruthin! Second window finished. Time for a coffee!🌞🌈",
            photoId: "3"
        },
        {
            image: "https://scontent-lhr8-1.xx.fbcdn.net/v/t1.0-9/100105873_933786740409404_9185360274910085120_o.jpg?_nc_cat=107&_nc_sid=9267fe&_nc_ohc=sl8FTHQYmrUAX9g8rKJ&_nc_ht=scontent-lhr8-1.xx&oh=66f42358542a62a0cabbe25b6b991710&oe=5F12BB70",
            title: "Amazing weather today!",
            desc: "Granted, the weather is terrible today. But we have fresh hot coffee and delicious cakes for you to take home and enjoy, why not pop in and treat yourself? #localbusiness",
            photoId: "4"
        },
        {
            image: "https://scontent-lhr8-1.xx.fbcdn.net/v/t1.0-9/103287452_944450469343031_6369883692757897880_o.jpg?_nc_cat=110&_nc_sid=9267fe&_nc_ohc=NBsz_tr-Cr0AX-qY0if&_nc_ht=scontent-lhr8-1.xx&oh=2238c5f728ba8ea7fc738e521729e0b1&oe=5F0FA93D",
            title: "Food was brilliant",
            desc: "Another gorgeous day in Ruthin! Second window finished. Time for a coffee!🌞🌈",
            photoId: "5"
        },
        {
            image: "https://scontent-lhr8-1.xx.fbcdn.net/v/t1.0-9/82518908_938809193240492_6423717413346344960_o.jpg?_nc_cat=109&_nc_sid=a26aad&_nc_ohc=Oh46nVufresAX-IsuLf&_nc_ht=scontent-lhr8-1.xx&oh=9d78b78ec730affcf0e2f9f29189784b&oe=5F11BB7A",
            title: "Todays cup of coffee!",
            desc: "Granted, the weather is terrible today. But we have fresh hot coffee and delicious cakes for you to take home and enjoy, why not pop in and treat yourself? #localbusiness",
            photoId: "6"
        },
        {
            image: "https://scontent-lht6-1.xx.fbcdn.net/v/t1.0-9/88253696_876165216171557_742865433371082752_o.jpg?_nc_cat=100&_nc_sid=9267fe&_nc_ohc=DuvV6WdDmjwAX_CFB62&_nc_ht=scontent-lht6-1.xx&oh=e91547906b5a3123bd45bcbb8053deff&oe=5F11389E",
            title: "Food was brilliant",
            desc: "Another gorgeous day in Ruthin! Second window finished. Time for a coffee!🌞🌈",
            photoId: "7"
        },
        {
            image: "https://scontent-lhr8-1.xx.fbcdn.net/v/t1.0-9/82794666_846750642446348_7563659870382063616_n.jpg?_nc_cat=101&_nc_sid=8bfeb9&_nc_ohc=jRlLDkeOUAUAX_KvAwD&_nc_ht=scontent-lhr8-1.xx&oh=d7e1c25879d7a7f177729784dbc7a7f6&oe=5F114E1D",
            title: "Todays cup of coffee!",
            desc: "Granted, the weather is terrible today. But we have fresh hot coffee and delicious cakes for you to take home and enjoy, why not pop in and treat yourself? #localbusiness",
            photoId: "8"
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