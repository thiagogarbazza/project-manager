'use strict';
const HttpStatus = require('http-status-codes');





module.exports = {
  get
};

function get(response, promise) {
  promise
    .then(result => response.json(result))
    .catch(error => response.status(HttpStatus.PRECONDITION_FAILED).json({
      error: error.errors,
      message: error.message
    }));
}
