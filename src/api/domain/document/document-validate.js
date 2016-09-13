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
    const promiseCodeIsRequire = this.codeIsRequire(document);
    const promiseNameIsRequire = this.nameIsRequire(document);
    return this.resolveValidationPromises([promiseCodeIsRequire, promiseNameIsRequire]);
  }

  codeIsRequire(document) {
    if (!document.code) {
      const businessCase = new BusinessCase('document.code', 'The code is require.');
      return Promise.resolve(businessCase);
    }
    return Promise.resolve();
  }

  codeIsUnique(document) {
    const where = {
      codigo: document.codigo
    };

    return new Promise((resolve, reject) => {
      Documents.findOne({
          attributes: ['id'],
          where
        })
        .then(result => {
          if (result && result.id !== document.id) {
            const businessCase = new BusinessCase('area.codigo.unique', 'The code should be unique');
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
