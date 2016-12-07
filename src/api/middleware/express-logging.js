'use strict';

const morgan = require('morgan');
const winston = require('winston');

module.exports = app => {
  const OPTIONS = {
    stream: {
      write: message => winston.info(message)
    }
  };

  app.use(morgan('common', OPTIONS));
};
