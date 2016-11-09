'use strict';
const environment = require('../environment');
const winston = require('winston');

module.exports = app => {
  const configuration = environment.logger;
  winston.level = configuration.level;
  winston.colorize = configuration.colorize;
};
