'use strict';
const logger = require('../logger');
const morgan = require('morgan');

module.exports = app => {
  const OPTIONS = {
    stream: {
      write: message => logger.info(message)
    }
  };

  app.use(morgan('common', OPTIONS));
};
