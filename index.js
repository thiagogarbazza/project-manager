let consign = require("consign");
let express = require("express");

const app = express();

consign({verbose: false})
  .include("src/configuration.js")
  .then("src/startup/start-sequelize.js")
  .then("src/startup/loading-models.js")
  .then("src/startup/authentication.js")
  .then("src/startup/middlewares.js")
  .then("src/startup/loading-routes.js")
  .then("src/startup/boot.js")
  .into(app);

module.exports = app;
