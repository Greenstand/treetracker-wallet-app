const supertest = require('supertest');
const status = require('statuses'); /* eslint-disable-line import/no-extraneous-dependencies */
const log = require('loglevel');

log.setLevel(process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'warn');

// Override supertest expect to get the error
supertest.Test.prototype.expect = function (statusCode) {
  return this.then((res) => {
    if (res.status !== statusCode) {
      const message = `expected ${statusCode} "${status(statusCode)}", got ${
        res.status
      } "${status(res.status)}"
response: ${JSON.stringify(res.body, null, 2)}`;
      log.error(message);
      throw message;
    }
    return this;
  });
};

module.exports = supertest;
