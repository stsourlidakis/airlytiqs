const pgp = require("pg-promise")();
const cn = {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: process.env.DB_PASS
};
const db = pgp(cn);

module.exports.writeTelemetry = function(val){
	return db.none('INSERT INTO telemetry(val) VALUES($1)', [val]);
}

module.exports.readTelemetry = function(){
	return db.any("SELECT id, val, created at time zone 'utc' at time zone 'Europe/Athens' as created FROM telemetry");
}
