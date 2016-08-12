const path = require('path');
const glob = require('glob');
const logger = require('../logger');
const array = require('lodash/array');
const validator = require('validator');

module.exports = app => {

  // Alterando as rotas.
  app.use((req, res, next) => {
    delete req.body.id;
    next();
  });

  app.param('uuid', function(req, res, next, value) {
    if (validator.isUUID(value, 4)) {
      next();
    } else {
      next('route');
    }
  });

  //app.route('/service/**').all(app.authentication.authenticate());

  const modelFiles = path.join(__dirname, '../domain/**/*-route.js');
  glob.sync(modelFiles, {}).forEach(modelFile => {
    logger.info('Loading the route:', array.last(modelFile.split('/')));
    require(modelFile)(app);
  });
};
