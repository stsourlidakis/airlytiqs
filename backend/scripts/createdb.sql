CREATE TABLE IF NOT EXISTS "telemetry" (
	"id" SERIAL NOT NULL UNIQUE PRIMARY KEY,
	"raw" TEXT,
	"uvRad" INTEGER,
	"irRad" REAL,
	"visRad" REAL,
	"uvIndex" REAL,
	"dustRaw" REAL,
	"dustIndex" INTEGER,
	"coRaw" REAL,
	"coIndex" INTEGER,
	"created" TIMESTAMP NOT NULL DEFAULT NOW()
);
