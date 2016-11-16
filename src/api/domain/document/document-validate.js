'use strict';
const {AbstractValidate, BusinessCase} = require('business-error');
const {trim} = require('lodash');

const NAME_MAXLENGTH = 100;

class DocumentValidate extends AbstractValidate {
  constructor(app) {
    super();
    this.documentModel = app.domain.document.DocumentModel;
  }

  onCreate(document) {
    return this.resolveValidationPromises(
      this.nameIsRequired(document),
      this.nameMustHaveMaximum100Characters(document),
      this.projectIsRequired(document)
    );
  }

  onUpdate(document) {
    return this.resolveValidationPromises(
      this.nameIsRequired(document),
      this.nameMustHaveMaximum100Characters(document),
      this.projectIsRequired(document)
    );
  }

  nameIsRequired({name}) {
    if (!trim(name)) {
      const businessCase = new BusinessCase('document.name.required', 'Name is required');
      return Promise.resolve(businessCase);
    }
    return Promise.resolve();
  }

  nameMustHaveMaximum100Characters({name}) {
    if (name && name.length > NAME_MAXLENGTH) {
      const businessCase = new BusinessCase('document.name.maxlength', 'Name must have a maximum of 100 characters');
      return Promise.resolve(businessCase);
    }
    return Promise.resolve();
  }

  nameMustBeUnique({id, name}) {
    const quering = {
      attributes: ['id'],
      where: {name}
    };

    return this.documentModel.findOne(quering)
      .then(result => {
        if (result && result.id !== id) {
          const businessCase = new BusinessCase('document.name.unique', 'Name must be unique');
          return Promise.resolve(businessCase);
        }
        return Promise.resolve();
      });
  }

  projectIsRequired({projectId}) {
    if (!trim(projectId)) {
      const businessCase = new BusinessCase('document.project.required', 'Project is required');
      return Promise.resolve(businessCase);
    }
    return Promise.resolve();
  }
}

module.exports = DocumentValidate;
