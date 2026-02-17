const { Client } = require("pg");
const log = require("loglevel");
require("dotenv").config();

const connectionString = process.env.DATABASE_URL;
console.log(connectionString);
if (!connectionString) {
  log.warn("DATABASE_URL is not set!");
}

const pgClient = new Client({
  connectionString,
});

const pgClient2 = new Client({
  connectionString,
});

pgClient.connect(err => {
  if (err) {
    const message = `error in connecting to DB: ${err}`;
    log.error(message);
    throw message;
  } else {
    log.info(`Database connected!`);
  }
});

pgClient2.connect(err => {
  if (err) {
    const message = `error in connecting to DB: ${err}`;
    log.error(message);
    throw message;
  } else {
    log.info(`Database connected!`);
  }
});

module.exports = { pgClient, pgClient2 };
