'use strict';
const BusinessMessage = require('business-error').Message;
const BusinessError = require('business-error').Error;

class DocumentValidate {
  constructor(app) {
    this.app = app;
    this.errors = [];
  }

  validateOnCreate(document) {
    this.codeIsRequire(document);
    this.nameIsRequire(document);
    this.processValidate();
  }

  processValidate() {
    if (this.errors.length !== 0) {
      throw new BusinessError(this.errors);
    }
  }

  codeIsRequire(document) {
    if (!document.code) {
      const error = new BusinessMessage('document.code', 'The code is require.');
      this.errors.push(error);
    }
  }

  nameIsRequire(document) {
    if (!document.name) {
      const error = new BusinessMessage('document.name', 'The name is required.');
      this.errors.push(error);
    }
  }
}

module.exports = DocumentValidate;
