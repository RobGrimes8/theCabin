let express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    flash = require("connect-flash"),
    methodOverride = require("method-override");
const mongoose = require('mongoose');
var Filter = require('bad-words'),
    filter = new Filter();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());

const commentSchema = new mongoose.Schema({
    name: String,
    message: String,
    date: String
});
const Comment = mongoose.model("Comment", commentSchema);

const imageSchema = new mongoose.Schema({
    image: String,
    title: String,
    desc: String
});
const Image = mongoose.model("Image", imageSchema);

mongoose.connect('mongodb+srv://' + process.env._MONGOOSE + '@cluster0-rkzfs.mongodb.net/The_Cabin?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log("Db connected")

    // const silence = new Comment({ name: "Beth", message: "I love cake!" });
    // silence.save(function(err, silence) {
    //     if (err) return console.log(err);
    //     console.log(silence);
    // })
    // Comment.find(function(err, comments) {
    //     if (err) return console.error(err);
    //     console.log(comments);
    // });
    // Comment.find({ name: "Beth" }, function(err, comments) {
    //     if (err) return console.log(err);
    //     console.log(comments);
    // });
});



app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/gallery", function(req, res) {
    var imageArr = [];
    var commentsArr = [];

    Image.find(function(err, images) {
        if (err) return console.error(err);
        imageArr = images;
    });

    Comment.find(function(err, comments) {
        if (err) return console.error(err);
        let reverseComments = comments.reverse();
        commentsArr = reverseComments;
        res.render("gallery", { photos: imageArr, comments: commentsArr });
    });



});

app.post("/gallery", function(req, res) {
    let name = req.body.name,
        message = req.body.message;

    if (filter.isProfane(message)) {
        console.log("You cannot use that language");
        res.redirect("/gallery");
    } else {
        if (name === "") {
            name = "Coffee Fan!";
        }

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = dd + '/' + mm + '/' + yyyy;

        const newComment = new Comment({ name: name, message: message, date: today });
        newComment.save(function(err, silence) {
            if (err) return console.log(err);
        })
        res.redirect("/gallery");
    }

})

app.listen(process.env.PORT || 3000, function() {
    console.log("Server is up and running boss")
});