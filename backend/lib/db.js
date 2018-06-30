const pgp = require("pg-promise")();
const cn = {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: process.env.DB_PASS
};
const db = pgp(cn);

module.exports.writeTelemetry = function(raw, uvRad, irRad, visRad, uvIndex, dustRaw, dustIndex, coRaw, coIndex){
	return db.one('INSERT INTO telemetry("raw", "uvRad", "irRad", "visRad", "uvIndex", "dustRaw", "dustIndex", "coRaw", "coIndex") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING "created" at time zone \'utc\' at time zone \'Europe/Athens\' as created', [raw, uvRad, irRad, visRad, uvIndex, dustRaw, dustIndex, coRaw, coIndex]);
}

module.exports.readTelemetry = function(){
	return db.any("SELECT * FROM telemetry");
}
