'use strict';
const validator = require('validator');

module.exports = app => {
  app.use(app.authentication.initialize());

  app.route('/service/**').all(function scapeTokenRoute(req, res, next) {
    if (validator.matches(req.url, '^/service/token$', 'ig')) {
      next('route');
    } else {
      next();
    }
  }, app.authentication.authenticate());
};
