var express = require("express");
var _ = require("underscore");

var app = express();

app.use(express.static(__dirname + '/public'));


app.post('/post-info', function(req, res) {
	res.send('success');
});

app.listen(3001);