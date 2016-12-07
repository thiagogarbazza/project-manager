'use strict';

const TokenService = require('./token-service');
const HttpStatus = require('http-status-codes');

module.exports = app => {
  const tokenService = new TokenService(app);

  app.route('/service/security/token')
    .post((req, res) => {
      tokenService.generate(req.body)
        .then(result => res.json(result))
        .catch(error => res.status(HttpStatus.UNAUTHORIZED).json({message: error.message}));
    });
};
