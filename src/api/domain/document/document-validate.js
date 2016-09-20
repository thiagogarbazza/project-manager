'use strict';
const AbstractValidate = require('business-error').AbstractValidate;
const BusinessCase = require('business-error').Case;

class DocumentValidate extends AbstractValidate {
  constructor(app) {
    super();
    this.app = app;
    this.Documents = app.domain.document.Documents;
  }

  onCreate(document) {
    return this.resolveValidationPromises([
      this.codeIsRequire(document),
      this.codeIsUnique(document),
      this.nameIsRequire(document)
    ]);
  }

  codeIsRequire(document) {
    if (!document.code) {
      const businessCase = new BusinessCase('document.code.required', 'The code is require.');
      return Promise.resolve(businessCase);
    }
    return Promise.resolve();
  }

  codeIsUnique(document) {
    if (!document.code) {
      return Promise.resolve();
    }

    const consulta = {
      attributes: ['id'],
      where: {
        code: document.code
      }
    };

    return new Promise((resolve, reject) => {
      this.Documents.findOne(consulta)
        .then(result => {
          if (result && result.id !== document.id) {
            const businessCase = new BusinessCase('document.code.unique', 'The code should be unique');
            return resolve(businessCase);
          }
          return resolve();
        })
        .catch(error => reject(error));
    });
  }

  nameIsRequire(document) {
    if (!document.name) {
      const businessCase = new BusinessCase('document.name', 'The name is required.');
      return Promise.resolve(businessCase);
    }
    return Promise.resolve();
  }
}

module.exports = DocumentValidate;
