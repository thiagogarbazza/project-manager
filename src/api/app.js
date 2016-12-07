'use strict';
const consign = require('consign');
const express = require('express');

const app = express();
const CONSIGN_OPTIONS = {verbose: false};

consign(CONSIGN_OPTIONS)
  .then('src/api/configuration/winston.js')
  .then('src/api/configuration/sequelize.js')
  .then('src/api/startup/loading-models.js')
  .then('src/api/configuration/authentication.js')
  .then('src/api/middleware/express-logging.js')
  .then('src/api/middleware/express-route-authentication.js')
  .then('src/api/middleware/express-route-cors.js')
  .then('src/api/middleware/express-route-request.js')
  .then('src/api/middleware/express-route-response.js')
  .then('src/api/middleware/express-error-handler.js')
  .then('src/api/startup/loading-routes.js')
  .then('src/api/startup/bootstrap.js')
  .into(app);

module.exports = app;
