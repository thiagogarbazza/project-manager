'use strict';
const HttpStatus = require('http-status-codes');
const errorRouteResolve = require('./error-route-resolve');

module.exports = {
  create,
  destroy,
  find,
  update
};

function create(response, promise) {
  promise
    .then(result => response.status(HttpStatus.CREATED).json(result))
    .catch(error => errorRouteResolve(error, response));
}

function destroy(response, promise) {
  promise
    .then(() => response.sendStatus(HttpStatus.NO_CONTENT))
    .catch(error => errorRouteResolve(error, response));
}

function find(response, promise) {
  promise
    .then(result => response.json(result))
    .catch(error => errorRouteResolve(error, response));
}

function update(response, promise) {
  promise
    .then(() => response.sendStatus(HttpStatus.NO_CONTENT))
    .catch(error => errorRouteResolve(error, response));
}
