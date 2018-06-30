require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app)
const bodyParser = require('body-parser');
const io = require('socket.io')(http);
app.use(bodyParser.text());

const db = require('./lib/db.js');
const utils = require('./lib/utils.js');

app.use(express.static('../frontend'));

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
		const rawValues = req.body.replace(/\s/g,'').split(',').map(val => val>=0 ? val : 0);
		let values = {
			raw: req.body,
			uvRad: Number(rawValues[0]),
			irRad: Number(rawValues[1]),
			visRad: Number(rawValues[2]),
			uvIndex: Number(rawValues[3]),
			dustRaw: Number(rawValues[4]),
			dustIndex: Number(rawValues[5]),
			coRaw: Number(rawValues[6]),
			coIndex: Number(rawValues[7])
		};

		const timestamp = (await db.writeTelemetry(values.raw, values.uvRad, values.irRad, values.visRad, values.uvIndex, values.dustRaw, values.dustIndex, values.coRaw, values.coIndex)).created;
		res.status(201).send('ok');

		values.timestamp = timestamp;
		const clientData = utils.getDataForClient(values);
		io.sockets.emit('telemetry', clientData);

		console.table(values);
	}
	catch(e) {
		next(e);
	}
});

io.on('connection', function (socket) {
	console.log('New connection');
});

//default error handling
app.use(function(err, req, res, next) {
	console.log(err);
	res.status(500).json({message: 'an error occurred', error: err.message});
});

http.listen(process.env.PORT, function(){
	console.log(`App listening on port ${process.env.PORT}`);
});
