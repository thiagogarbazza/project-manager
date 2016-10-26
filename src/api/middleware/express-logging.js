'use strict';
const logger = require('../logger');
const morgan = require('morgan');

module.exports = app => {
  app.use(morgan('common', {
    stream: {
      write: message => logger.info(message)
    }
  }));
};
