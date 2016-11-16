'use strict';
const compression = require('compression');
const environment = require('../environment');
const express = require('express');

module.exports = app => {
  const configuration = environment.server;

  app.set('json spaces', configuration.jsonSpaces);
  app.use(express.static(configuration.webDir));
  app.use(compression());
};
