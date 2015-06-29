var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var smsConfig = require('../config/sms');
var emailConfig =require('../config/email');
var client = require('twilio')(accountSid, authToken);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Marias Blog' });
});

router.get('/send-text', function(req, res){
	client.messages.create({
    body: "Jenny please?! I love you <3",
    to: "+13106934698",
    from: smsConfig.fromNumber
}, function(err, message) {
    if(err){
    	console.log(err);
    }else{
    	console.log(message);
    };
    res.send('finished')

   });
});

router.get('/send-email', function(req, res){
	var transporter = nodemailer.createTransport(emailConfig
		);
		
	

	var message = {
		from: 'bob@bob.com',
		to: 'zamora.mariac@gmail.com',
		subject: 'Test email.',
		text: 'hello world',
		html: '<b>Text contents.</b>'
	};
	
	transporter.sendMail(message, function(error,info){
		if (error){
			console.log(error);
		} else{
			console.log(info);
		}
	});
});

module.exports = router;
