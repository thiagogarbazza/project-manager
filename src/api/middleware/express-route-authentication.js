'use strict';

const validator = require('validator');

module.exports = app => {
  app.use(app.authentication.initialize());

  app.route('/service/**')
    .all(scapeTokenRoute, app.authentication.authenticate());
};

function scapeTokenRoute(req, res, next) {
  if (validator.matches(req.url, '^/service/security/token$', 'ig')) {
    return next('route');
  }
  return next();
}
