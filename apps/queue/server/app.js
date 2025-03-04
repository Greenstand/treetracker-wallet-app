const express = require('express');
const cors = require('cors');

const log = require('loglevel');
const HttpError = require('./utils/HttpError');
const { errorHandler } = require('./utils/utils');
const { handlerWrapper } = require('./utils/utils');
const messageRouter = require('./routes/messageRouter');

const app = express();

if (process.env.NODE_ENV === 'development') {
  log.info('disable cors');
  app.use(cors());
}

/*
 * Check request
 */
app.use(
  handlerWrapper(async (req, _res, next) => {
    if (
      req.method === 'POST' ||
      req.method === 'PATCH' ||
      req.method === 'PUT'
    ) {
      if (req.headers['content-type'] !== 'application/json') {
        throw new HttpError(
          415,
          'Invalid content type. API only supports application/json',
        );
      }
    }
    next();
  }),
);

app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(express.json()); // parse application/json

// routers
// app.use('/', router);
app.use('/message', messageRouter);

// Global error handler
app.use(errorHandler);

const { version } = require('../package.json');

const server = app.get('*', function (req, res) {
  res.status(200).send(version);
});



process.once('SIGINT', () => {
  console.log('Terminate request received...');
  server.close();
})
module.exports = app;
