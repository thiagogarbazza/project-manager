'use strict';

const {isUUID} = require('validator');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const UUID_VERSION = 4;

module.exports = app => {
  app.use(helmet());

  app.use(bodyParser.json());

  // Alterando as rotas.
  app.use((req, res, next) => {
    delete req.body.id;

    return next();
  });

  app.param('uuid', (req, res, next, value) => {
    if (isUUID(value, UUID_VERSION)) {
      req.body.id = req.params.uuid;

      return next();
    }

    return next('route');
  });
};
