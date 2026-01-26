const { Client } = require("pg");
const log = require("loglevel");
require("dotenv").config();

const connectionString = process.env.DATABASE_URL;

let pgClient = null;
let pgClient2 = null;

if (!connectionString) {
  log.warn("DATABASE_URL is not set! Queue features will be disabled.");
} else {
  pgClient = new Client({
    connectionString,
  });

  pgClient2 = new Client({
    connectionString,
  });

  pgClient.connect(err => {
    if (err) {
      const message = `error in connecting to DB: ${err}`;
      log.error(message);
      // Don't throw in development - just warn
      if (process.env.NODE_ENV === "production") {
        throw message;
      }
    } else {
      log.info(`Database connected!`);
    }
  });

  pgClient2.connect(err => {
    if (err) {
      const message = `error in connecting to DB: ${err}`;
      log.error(message);
      // Don't throw in development - just warn
      if (process.env.NODE_ENV === "production") {
        throw message;
      }
    } else {
      log.info(`Database connected!`);
    }
  });
}

module.exports = { pgClient, pgClient2 };
