'use strict';
const path = require('path');
const glob = require('glob');
const logger = require('../logger');
const array = require('lodash/array');

const ROUTE_FILES = path.join(__dirname, '../domain/**/*-route.js');
const GLOB_SETTINGS = {
  realpath: true
};

module.exports = app => {
  glob.sync(ROUTE_FILES, GLOB_SETTINGS).forEach(routeFile => {
    logger.info('Loading the route:', array.last(routeFile.split('/')));
    require(routeFile)(app);
  });
};
