'use strict';

const routeResolver = require('express-route-resolver');

module.exports = app => {
  app.use(BusinessErrorHandler);
};

function BusinessErrorHandler(error, request, response, next) {
  routeResolver.onError(response, error);
}
