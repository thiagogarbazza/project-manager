let fs = require("fs");
let https = require("https");
let sequelize = require("./start-sequelize");
let logger = require('../logger.js');

module.exports = app => {
  const configuration = app.configuration.server;

  if (process.env.NODE_ENV !== "test") {
    if(configuration.databaseSync) {
      app.sequelize.sync().done(() => {
        startupApp();
      });
    } else {
      startupApp();
    }
  }

  function startupApp() {
    const port = configuration.port || 3000;
    app.listen(port, () => {
      logger.info('##########################################################');
      logger.info('###       Application  project-manager                 ###');
      logger.info(`### work in ${process.pid} started                               ###`);
      logger.info(`### listen in ${port}                                     ###`);
      logger.info('##########################################################');
    });
  }
};
