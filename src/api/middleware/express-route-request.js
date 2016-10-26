'use strict';
const bodyParser = require('body-parser');
const helmet = require('helmet');
const {isUUID} = require('validator');

const UUID_VERSION = 4;

module.exports = app => {
  app.use(helmet());

  app.use(bodyParser.json());

  // Alterando as rotas.
  app.use((req, res, next) => {
    delete req.body.id;
    next();
  });

  app.param('uuid', function(req, res, next, value) {
    if (isUUID(value, UUID_VERSION)) {
      req.body.id = req.params.uuid;
      next();
    } else {
      next('route');
    }
  });
};
