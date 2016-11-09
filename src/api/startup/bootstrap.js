'use strict';
const environment = require('../environment');
const loadingDataBase = require('./loading-data-base');
const winston = require('winston');

const DEFAULT_SERVER_PORT = 3000;

module.exports = app => {
  const configuration = environment.server;

  if (configuration.syncDatabase) {
    app.sequelize.sync()
      .then(() => loadingDataBase(app))
      .then(() => bootstrap());
  } else {
    bootstrap();
  }

  function bootstrap() {
    const port = configuration.port || DEFAULT_SERVER_PORT;
    app.listen(port, () => {
      winston.info('##########################################################');
      winston.info('               Application  audint                        ');
      winston.info(`    work in ${process.pid} started                        `);
      winston.info(`    listen in ${port}                                     `);
      winston.info('##########################################################');
    });
  }
};
