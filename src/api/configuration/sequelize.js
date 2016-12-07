'use strict';

const environment = require('../environment');
const Sequelize = require('sequelize');
const winston = require('winston');
const configuration = environment.database;

module.exports = app => {
  if (!app.sequelize) {
    configuration.options.logging = winston.debug;

    app.sequelize = new Sequelize(
      configuration.database,
      configuration.username,
      configuration.password,
      configuration.options
    );
  }
};
