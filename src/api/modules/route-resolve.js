'use strict';
const HttpStatus = require('http-status-codes');

module.exports = {
  create,
  destroy,
  find,
  update
};

function create(response, promise) {
  promise
    .then(result => response.status(HttpStatus.CREATED).json(result))
    .catch(error => resolveCatch(error, response));
}

function destroy(response, promise) {
  promise
    .then(() => response.sendStatus(HttpStatus.NO_CONTENT))
    .catch(error => resolveCatch(error, response));
}

function find(response, promise) {
  promise
    .then(result => response.json(result))
    .catch(error => resolveCatch(error, response));
}

function update(response, promise) {
  promise
    .then(() => response.sendStatus(HttpStatus.NO_CONTENT))
    .catch(error => resolveCatch(error, response));
}

function resolveCatch(error, response) {
  return response.status(HttpStatus.PRECONDITION_FAILED).json({
    error: error.errors,
    message: error.message
  });
}
