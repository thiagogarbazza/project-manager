'use strict';

const compression = require('compression');
const environment = require('../environment');
const express = require('express');

const configuration = environment.server;

module.exports = app => {
  app.set('json spaces', configuration.jsonSpaces);
  app.use(compression());

  if (Array.isArray(environment.server.webDir)) {
    environment.server.webDir.forEach(staticPage => app.use(express.static(staticPage)));
  } else {
    app.use(express.static(environment.server.webDir));
  }
};
