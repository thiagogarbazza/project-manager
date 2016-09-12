'use strict';
const HttpStatus = require('http-status-codes');

module.exports = errorRouteResolve;

function errorRouteResolve(error, response) {
  return response.status(HttpStatus.PRECONDITION_FAILED).json({
    error: error.errors,
    message: error.message
  });
}
