'use strict';
const logger = require('../logger.js');
const loadingDataBase = require('./loading-data-base');

const DEFAULT_SERVER_PORT = 3000;

module.exports = app => {
  const configuration = app.configuration.server;

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
      logger.info('##########################################################');
      logger.info('               Project-manager                            ');
      logger.info(`    work in ${process.pid} started                        `);
      logger.info(`    listen in ${port}                                     `);
      logger.info('##########################################################');
    });
  }
};
