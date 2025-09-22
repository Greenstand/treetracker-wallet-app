const { Client } = require("pg");
const log = require("loglevel");
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env.DATABASE_URL;
// console.log("This is the DB link: ", connectionString);
if (!connectionString) {
  log.warn("DATABASE_URL is not set!");
}

export const pgClient = new Client({
  connectionString,
});

// const pgClient2 = new Client({
//   connectionString,
// });

pgClient.connect(err => {
  if (err) {
    const message = `error in connecting to DB: ${err}`;
    log.error(message);
    throw message;
  } else {
    log.info(`Database connected!`);
  }
});

// pgClient2.connect(err => {
//   if (err) {
//     const message = `error in connecting to DB: ${err}`;
//     log.error(message);
//     throw message;
//   } else {
//     log.info(`Database connected!`);
//   }
// });

// module.exports = { pgClient, pgClient2 };
// module.exports = { pgClient };
