const path = require('path');
const glob = require('glob');
const yaml = require('yamljs');

const dbFiles = path.join(__dirname, 'src/api-db/**/*.yml');
glob.sync(dbFiles, {}).forEach((dbFile, index) => {
  console.log(index, dbFile);
  let db = yaml.load(dbFile);
  console.error('first data', db.load[0].data[0]);
});


// const consign = require("consign");
// const express = require("express");

// const app = express();

// consign({verbose: false})
//   .include("src/configuration.js")
//   .then("src/startup/start-sequelize.js")
//   .then("src/startup/loading-models.js")
//   .then("src/startup/authentication.js")
//   .then("src/startup/middlewares.js")
//   .then("src/startup/loading-routes.js")
//   .then("src/startup/boot.js")
//   .into(app);

// module.exports = app;
