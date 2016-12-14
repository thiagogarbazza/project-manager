'use strict';

const Sequelize = require('sequelize');
const environment = require('../environment');
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
