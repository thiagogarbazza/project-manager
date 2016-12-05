'use strict';
const environment = require('../environment');
const Sequelize = require('sequelize');
const winston = require('winston');

module.exports = app => {
  if (!app.sequelize) {
    const configuration = environment.database;
    configuration.options.logging = winston.debug;

    app.sequelize = new Sequelize(
      configuration.database,
      configuration.username,
      configuration.password,
      configuration.options
    );
  }
};
