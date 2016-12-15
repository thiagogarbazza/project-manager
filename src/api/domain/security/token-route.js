'use strict';

const TokenService = require('./token-service');
const HttpStatus = require('http-status-codes');

module.exports = app => {
  const tokenService = new TokenService(app);

  app.route('/service/security/token')
    .post((request, response) => {
      tokenService.generate(request.body)
        .then(result => response.json(result))
        .catch(error => response.status(HttpStatus.UNAUTHORIZED).json({message: error.message}));
    });
};
