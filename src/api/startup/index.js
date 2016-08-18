const configuration = require('../configuration');
const logger = require('../logger');
const express = require('express');
const loadingRoutes = require('./loading-routes');
const startMorgan = require('./start-morgan');
const startSequelize = require('./start-sequelize');
const startCors = require('./start-cors');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');

module.exports = {
  'start': start
};

function start(app) {
  app.set('json spaces', configuration.server.jsonSpaces || 0);
  app.use(express.static(configuration.server.publicFolder));

  app.use(helmet());
  app.use(compression());
  app.use(bodyParser.json());

  // startSequelize(app);
  loadingRoutes(app);
  startMorgan(app);
  startCors(app);
  createListen(app);
}

function createListen(app) {
  const port = configuration.server.apiPort || 3001;
  app.listen(port, () => {
    logger.info(`
      ##########################################################
      ####          Application  project-manager            ####
      ####                                                  ####
      ##########################################################

      *  configurable: ${configuration.name}
      *  work in pid: ${process.pid}
      *  listen port: ${port}
    `);
  });
}
