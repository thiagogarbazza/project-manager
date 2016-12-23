'use strict';

const HttpStatus = require('http-status-codes');
const morgan = require('morgan');
const winston = require('winston');

const OPTIONS = {
  skip,
  stream: {write: loggging}
};

module.exports = app => {
  app.use(morgan('common', OPTIONS));
};

function loggging(message) {
  return winston.warn(message);
}

function skip(req, res) {
  return res.statusCode < HttpStatus.BAD_REQUEST;
}
