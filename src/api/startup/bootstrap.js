'use strict';

const environment = require('../environment');
const loadingDataBase = require('./loading-data-base');
const winston = require('winston');

const configuration = environment.server;
const DEFAULT_SERVER_PORT = 3000;

module.exports = app => {
  if (configuration.syncDatabase) {
    return app.sequelize.sync()
      .then(() => loadingDataBase(app))
      .then(() => bootstrap());
  }

  bootstrap();

  function bootstrap() {
    const port = configuration.port || DEFAULT_SERVER_PORT;

    app.listen(port, () => {
      winston.info('##########################################################');
      winston.info('               Application  project-manager               ');
      winston.info(`    work in ${process.pid} started                        `);
      winston.info(`    listen in ${port}                                     `);
      winston.info('##########################################################');
    });
  }
};
