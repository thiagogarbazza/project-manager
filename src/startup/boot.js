let fs = require("fs");
let https = require("https");
let sequelize = require("./start-sequelize");
let logger = require('../logger.js');

module.exports = app => {
  if (process.env.NODE_ENV !== "test") {
    const configuration = app.configuration.server
    app.sequelize.sync().done(() => {
      const port = configuration.port;
      app.listen(port, () => {
        logger.info(`####   project-manager api    ####\nlisten port ${port}`);
      });
    });
  }
};
