'use strict';

const environment = require('../environment');
const winston = require('winston');

const configuration = environment.logger;

module.exports = () => {
  winston.level = configuration.level;
  winston.colorize = configuration.colorize;
};
