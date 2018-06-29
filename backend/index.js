require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.get('/', async function(req, res, next){
	res.send('Hey');
});

//default error handling
app.use(function(err, req, res, next) {
	console.log(err);
	res.status(500).json({message: 'an error occurred', error: err.message});
});

app.listen(process.env.PORT, function(){
	console.log(`App listening on port ${process.env.PORT}`);
});
