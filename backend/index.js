require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.text());

const db = require('./lib/db.js');

app.get('/', async function(req, res, next){
	res.send('Hey');
});

app.get('/telemetry', async function(req, res, next){
	try{
		const telemetry = await db.readTelemetry();
		res.json(telemetry);
	}
	catch(e) {
		next(e);
	}
});

app.post('/telemetry', async function(req, res, next){
	try{
		await db.writeTelemetry(req.body);
		res.status(201).send('ok');
	}
	catch(e) {
		next(e);
	}
});

//default error handling
app.use(function(err, req, res, next) {
	console.log(err);
	res.status(500).json({message: 'an error occurred', error: err.message});
});

app.listen(process.env.PORT, function(){
	console.log(`App listening on port ${process.env.PORT}`);
});
