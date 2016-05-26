let fs = require("fs");
let https = require("https");
let sequelize = require("./start-sequelize");
let logger = require('../logger.js');

module.exports = app => {
  if (process.env.NODE_ENV !== "test") {
    const configuration = app.configuration.server;
    app.sequelize.sync().done(() => {
      console.log(configuration);
      const port = configuration.port || 3000;
      const ip = configuration.ip || 'localhost';
      app.listen(port, ip,() => {
        logger.info(`####   project-manager  ####`);
        logger.info(`Application worker ${process.pid} started...`);
        logger.info(`listen in ${ip}:${port}`);
      });
    });
  }
};
