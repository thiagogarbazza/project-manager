'use strict';
const BusinessCase = require('business-error').Case;
const BusinessError = require('business-error').Error;

class DocumentValidate {
  constructor(app) {
    this.app = app;
    this.businessCases = [];
  }

  onCreate(document) {
    this.codeIsRequire(document);
    this.nameIsRequire(document);
    this.processValidate();
  }

  processValidate() {
    if (this.businessCases.length !== 0) {
      throw new BusinessError(this.businessCases);
    }
  }

  codeIsRequire(document) {
    if (!document.code) {
      const businessCase = new BusinessCase('document.code', 'The code is require.');
      this.businessCases.push(businessCase);
    }
  }

  nameIsRequire(document) {
    if (!document.name) {
      const businessCase = new BusinessCase('document.name', 'The name is required.');
      this.businessCases.push(businessCase);
    }
  }
}

module.exports = DocumentValidate;
