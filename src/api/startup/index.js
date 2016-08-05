const configuration = require('../configuration');
const logger = require('../logger');

module.exports = {
  start: start
};

function start(app) {
  startupApp(app);
}

function startupApp(app) {
  const port = configuration.server.apiPort || 3001;
  app.listen(port, () => {
    logger.info(`
      ##########################################################
      ####          Application  project-manager            ####
      ####                                                  ####
      ##########################################################

      *  configurable: ${configuration.name}
      *  work in: ${process.pid}
      *  listen in: ${port}
    `);
  });
}
