'use strict';
const errorRouteResolve = require('../../modules/error-route-resolve');

module.exports = app => {
  app.use(BusinessErrorHandler);
};

function BusinessErrorHandler(err, req, res, next) {
  if (err.name === 'BusinessError') {
    errorRouteResolve(err, res);
  } else {
    return next(err);
  }
}
