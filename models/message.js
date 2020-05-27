var mongoose = require("mongoose");

var MessageSchema = new mongoose.Schema({
	name: String,
	email: String,
	subject: String,
	content: String
});

module.exports = mongoose.model("Message", MessageSchema);

