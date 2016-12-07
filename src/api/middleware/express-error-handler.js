'use strict';

const routeResolver = require('express-route-resolver');

module.exports = app => {
  app.use(BusinessErrorHandler);
};

function BusinessErrorHandler(err, req, res, next) {
  routeResolver.onError(res, err);
}
