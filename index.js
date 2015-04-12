var express = require('express');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser')
var app = express();

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'bambamanalytics@gmail.com',
        pass: 'chowchow123'
    }
});

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.post('/send-email', function(request, response) {
	var data = JSON.parse(request.body.data);
	var htmlText =
		'<p>Name: ' + data.name + '</p>' +
		'<p>Email: ' + data.email + '</p>' + 
		'<p>Phone: ' + data.phone + '</p>' +
		'<p>Message: ' + data.message + '</p>';
	var mailOptions = {
	    from: 'bambamanalytics@gmail.com', // sender address
	    to: 'franksiao@gmail.com, joseph.cal@gmail.com ', // list of receivers
	    subject: 'Client interest from ' + data.name, // Subject line
	    html: htmlText // html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        console.log(error);
	        response.send('Error');
	    }else{
	        console.log('Message sent: ' + info.response);
	        response.send('Cool');
	    }
	});
  
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
