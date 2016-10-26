'use strict';
const compression = require('compression');
const express = require('express');

module.exports = app => {
  const configuration = app.configuration;

  app.set('json spaces', configuration.server.jsonSpaces);
  app.use(express.static(configuration.server.webDir));
  app.use(compression());
};
