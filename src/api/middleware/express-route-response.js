'use strict';

const compression = require('compression');
const environment = require('../environment');
const express = require('express');

const configuration = environment.server;

module.exports = app => {
  app.set('json spaces', configuration.jsonSpaces);
  app.use(express.static(configuration.webDir));
  app.use(compression());
};
